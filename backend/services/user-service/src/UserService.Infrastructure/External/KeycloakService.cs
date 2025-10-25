using Flurl.Http;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using UserService.Application.Interfaces;
using UserService.Application.User.DTOs;

namespace UserService.Infrastructure
{
    public class KeycloakService : IKeycloakService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public KeycloakService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<LoginResponseDto> LoginAsync(string email, string password)
        {
            // Keycloak /token endpoint'i URL-encoded form bekler
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

            // var innerJson = JsonConvert.DeserializeObject<string>(responseBody);
            System.Console.WriteLine(responseBody);

            var settings = new JsonSerializerSettings
            {
                ContractResolver = new Newtonsoft.Json.Serialization.DefaultContractResolver
                {
                    NamingStrategy = new Newtonsoft.Json.Serialization.SnakeCaseNamingStrategy()
                }
            };

            var tokenDetails = JsonConvert.DeserializeObject<LoginResponseDto>(responseBody, settings);


            if (tokenDetails?.AccessToken == null)
                throw new Exception("Keycloak login failed: empty response");

            return tokenDetails;
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
            // Keycloak /token endpoint'i URL-encoded form bekler
            var response = await $"{_configuration["Keycloak:BaseUrl"]}/realms/{_configuration["Keycloak:Realm"]}/protocol/openid-connect/token"
                .PostUrlEncodedAsync(new
                {
                    grant_type = "client_credentials",
                    client_id = _configuration["Keycloak:AdminClientId"],
                    client_secret = _configuration["Keycloak:AdminClientSecret"]
                });

            var responseBody = await response.ResponseMessage.Content.ReadAsStringAsync();
            var tokenObj = JsonConvert.DeserializeObject<LoginResponseDto>(responseBody);

            if (tokenObj?.AccessToken == null)
                throw new Exception("Failed to get admin token");

            return tokenObj.AccessToken;
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