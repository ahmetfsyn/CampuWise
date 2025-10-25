using Flurl.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using UserService.Application.Interfaces;
using UserService.Application.User.DTOs;

namespace UserService.Infrastructure
{
    public class KeycloakService : IKeycloakService
    {
        private readonly IConfiguration _configuration;

        private readonly ILogger<KeycloakService> _logger;


        public KeycloakService(ILogger<KeycloakService> logger, IConfiguration configuration)
        {
            _configuration = configuration;
            _logger = logger;

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
        public async Task RegisterAsync(string fullName, string password, string email)
        {
            var (firstName, lastName) = GetFullNameAndLastName(fullName);
            var adminToken = await GetAdminTokenAsync();

            var user = new
            {
                username = email,
                email,
                firstName,
                lastName,
                attributes = new Dictionary<string, string[]>
                {
                    { "phoneNumber", new[]{""} },
                    { "avatarUrl", new[]{""} }
                },
                enabled = true,
                emailVerified = false,
                credentials = new[]
                {
                    new { type = "password", value = password, temporary = false }
                }
            };

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
            System.Console.WriteLine(responseBody);

            var tokenObj = JsonConvert.DeserializeObject<dynamic>(responseBody);
            string accessToken = tokenObj?.access_token;

            if (string.IsNullOrEmpty(accessToken))
                throw new Exception("Failed to get admin token");

            return accessToken;
        }

        private (string FirstName, string LastName) GetFullNameAndLastName(string fullName)
        {
            var fullNameList = fullName.Split(' ').ToList();
            var lastName = fullNameList.Last();
            fullNameList.Remove(lastName);
            var firstName = string.Join(" ", fullNameList);
            return (firstName, lastName);
        }
    }
}

// ! my-admin-client =  WAQi4v83RCrovOkjApTblfRaxCQ58raa

// ! user-service-client = bXl4zp1916ISgGxq4FCMEcl77B3PKyYy