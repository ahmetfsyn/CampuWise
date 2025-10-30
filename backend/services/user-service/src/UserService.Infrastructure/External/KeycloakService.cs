using Flurl.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using UserService.Application.Interfaces;
using UserService.Application.User.DTOs;

namespace UserService.Infrastructure.External;

public class KeycloakService(ILogger<KeycloakService> logger, IConfiguration configuration) : IKeycloakService
{
    private readonly IConfiguration _configuration = configuration;
    private readonly ILogger<KeycloakService> _logger = logger;



    public async Task<List<string>> GetUsersDetailsAsync(List<Guid> userIds)
    {

        var adminToken = await GetAdminTokenAsync();
        var baseUrl = $"{_configuration["Keycloak:BaseUrl"]}/admin/realms/{_configuration["Keycloak:Realm"]}/users";
        var results = new List<string>();

        HashSet<Guid> userIdsSet = [.. userIds];

        var tasks = userIdsSet.Select(async userId =>
        {
            var response = await $"{baseUrl}/{userId}"
                .WithHeader("Authorization", $"Bearer {adminToken}")
                .WithHeader("Accept", "application/json")
                .GetAsync();

            var body = await response.ResponseMessage.Content.ReadAsStringAsync();
            if (!string.IsNullOrEmpty(body))
            {
                lock (results)
                    results.Add(body);
            }
        });

        await Task.WhenAll(tasks);
        return results;
    }
    public async Task<LoginResponseDto> LoginAsync(string email, string password)
    {
        _logger.LogInformation("Starting Keycloak login for {Email}", email);

        try
        {
            var response = await $"{_configuration["Keycloak:BaseUrl"]}/realms/{_configuration["Keycloak:Realm"]}/protocol/openid-connect/token"
                .PostUrlEncodedAsync(new
                {
                    grant_type = "password",
                    client_id = _configuration["Keycloak:ClientId"],
                    client_secret = _configuration["Keycloak:ClientSecret"],
                    username = email,
                    password
                });

            var responseBody = await response.ResponseMessage.Content.ReadAsStringAsync();
            _logger.LogDebug("Keycloak login response: {ResponseBody}", responseBody);

            var settings = new JsonSerializerSettings
            {
                ContractResolver = new Newtonsoft.Json.Serialization.DefaultContractResolver
                {
                    NamingStrategy = new Newtonsoft.Json.Serialization.SnakeCaseNamingStrategy()
                }
            };

            var tokenDetails = JsonConvert.DeserializeObject<LoginResponseDto>(responseBody, settings);

            if (tokenDetails?.AccessToken == null)
                throw new Exception("Keycloak login failed: empty access token");

            _logger.LogInformation("Keycloak login succeeded for {Email}", email);
            return tokenDetails;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message + " for {Email}", email);
            throw;
        }
    }

    public async Task<LoginResponseDto> RefreshTokenAsync(string refreshToken)
    {
        var response = await $"{_configuration["Keycloak:BaseUrl"]}/realms/{_configuration["Keycloak:Realm"]}/protocol/openid-connect/token"
            .PostUrlEncodedAsync(new
            {
                grant_type = "refresh_token",
                client_id = _configuration["Keycloak:ClientId"],
                client_secret = _configuration["Keycloak:ClientSecret"],
                refresh_token = refreshToken
            });

        var responseBody = await response.ResponseMessage.Content.ReadAsStringAsync();

        _logger.LogDebug("Keycloak refresh token response: {ResponseBody}", responseBody);

        var settings = new JsonSerializerSettings
        {
            ContractResolver = new Newtonsoft.Json.Serialization.DefaultContractResolver
            {
                NamingStrategy = new Newtonsoft.Json.Serialization.SnakeCaseNamingStrategy()
            }
        };


        var tokenDto = JsonConvert.DeserializeObject<LoginResponseDto>(responseBody, settings);

        if (string.IsNullOrEmpty(tokenDto?.AccessToken))
            throw new Exception("Failed to refresh token");

        return tokenDto;
    }

    public async Task RegisterAsync(string fullName, string password, string email)
    {
        var (firstName, lastName) = GetFirstNameAndLastName(fullName);
        var adminToken = await GetAdminTokenAsync();

        string avatarUrl = $"https://avatar.iran.liara.run/username?username={firstName + lastName}";
        string defaultPhoneNumber = "0000000000";

        var userCustomAttributes = new Dictionary<string, object[]>
        {
            { "avatarUrl", new [] { avatarUrl } },
            { "phoneNumber", new string[] { defaultPhoneNumber } },
        };

        var user = new
        {
            username = email,
            email,
            firstName,
            lastName,
            attributes = userCustomAttributes,
            enabled = true,
            emailVerified = false,
            credentials = new[]
            {
                new { type = "password", value = password, temporary = false }
            }
        }
        ;

        await $"{_configuration["Keycloak:BaseUrl"]}/admin/realms/{_configuration["Keycloak:Realm"]}/users"
            .WithHeader("Authorization", $"Bearer {adminToken}")
            .WithHeader("Accept", "application/json")
            .PostJsonAsync(user);
    }

    private async Task<string> GetAdminTokenAsync()
    {
        var response = await $"{_configuration["Keycloak:BaseUrl"]}/realms/{_configuration["Keycloak:Realm"]}/protocol/openid-connect/token"
            .PostUrlEncodedAsync(new
            {
                grant_type = "client_credentials",
                client_id = _configuration["Keycloak:AdminClientId"],
                client_secret = _configuration["Keycloak:AdminClientSecret"]
            });

        var responseBody = await response.ResponseMessage.Content.ReadAsStringAsync();

        var tokenObj = JsonConvert.DeserializeObject<dynamic>(responseBody);
        string accessToken = tokenObj?.access_token;

        if (string.IsNullOrEmpty(accessToken))
            throw new Exception("Failed to get admin token");

        return accessToken;
    }

    private (string FirstName, string LastName) GetFirstNameAndLastName(string fullName)
    {
        var fullNameList = fullName.Split(' ').ToList();
        var lastName = fullNameList.Last();
        fullNameList.Remove(lastName);
        var firstName = string.Join(" ", fullNameList);
        return (firstName, lastName);
    }
}
