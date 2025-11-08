using System.IdentityModel.Tokens.Jwt;
using Flurl.Http;
using Mapster;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UserService.Application.Interfaces;
using UserService.Application.User.DTOs;
using UserService.Domain.Users;

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

    public async Task<GetUserByIdResponseDto> GetUserByIdAsync(Guid userId)
    {
        var adminToken = await GetAdminTokenAsync();
        var baseUrl = $"{_configuration["Keycloak:BaseUrl"]}/admin/realms/{_configuration["Keycloak:Realm"]}/users/{userId}";

        var response = await baseUrl
            .WithHeader("Authorization", $"Bearer {adminToken}")
            .GetAsync();

        var body = await response.ResponseMessage.Content.ReadAsStringAsync();

        dynamic user = JsonConvert.DeserializeObject<dynamic>(body)
            ?? throw new Exception("Failed to get user details");

        var attributes = user.attributes != null
            ? ((JObject)user.attributes).ToObject<Dictionary<string, string[]>>()
            : [];

        return new GetUserByIdResponseDto(
            Id: Guid.Parse((string)user.id),
            FullName: $"{(string?)user.firstName} {(string?)user.lastName}".Trim(),
            FirstName: (string?)user.firstName,
            LastName: (string?)user.lastName,
            Email: (string?)user.email,
            AvatarUrl: attributes.TryGetValue("avatarUrl", out var avatarArr) ? avatarArr.FirstOrDefault() : null,
            PhoneNumber: attributes.TryGetValue("phoneNumber", out var phoneArr) ? phoneArr.FirstOrDefault() : null
        );
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


            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(tokenDetails.AccessToken);

            var user = new AuthUser
            {
                Id = Guid.TryParse(jwtToken.Subject, out var id) ? id : Guid.Empty,
                Email = jwtToken.Claims.FirstOrDefault(c => c.Type == "email")?.Value,
                FirstName = jwtToken.Claims.FirstOrDefault(c => c.Type == "given_name")?.Value,
                LastName = jwtToken.Claims.FirstOrDefault(c => c.Type == "family_name")?.Value,
                AvatarUrl = jwtToken.Claims.FirstOrDefault(c => c.Type == "avatarUrl")?.Value,
            }.Adapt<AuthUserDto>();


            tokenDetails.User = user;


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
        string accessToken = tokenObj?.access_token ?? string.Empty;

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
