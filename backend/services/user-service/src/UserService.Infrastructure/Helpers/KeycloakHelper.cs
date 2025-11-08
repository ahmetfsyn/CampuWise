

using Flurl.Http;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace UserService.Infrastructure.Helpers
{
    public static class KeycloakHelper
    {
		public static async Task<string> GetAdminTokenAsync(IConfiguration configuration)
	{
		var response = await $"{configuration["Keycloak:BaseUrl"]}/realms/{configuration["Keycloak:Realm"]}/protocol/openid-connect/token"
			.PostUrlEncodedAsync(new
			{
				grant_type = "client_credentials",
				client_id = configuration["Keycloak:AdminClientId"],
				client_secret = configuration["Keycloak:AdminClientSecret"]
			});

		var responseBody = await response.ResponseMessage.Content.ReadAsStringAsync();

		var tokenObj = JsonConvert.DeserializeObject<dynamic>(responseBody);
		string accessToken = tokenObj?.access_token ?? string.Empty;

		if (string.IsNullOrEmpty(accessToken))
			throw new Exception("Failed to get admin token");

		return accessToken;
	}

    public static (string FirstName, string LastName) GetFirstNameAndLastName(string fullName)
    {
        var fullNameList = fullName.Split(' ').ToList();
        var lastName = fullNameList.Last();
        fullNameList.Remove(lastName);
        var firstName = string.Join(" ", fullNameList);
        return (firstName, lastName);
    }
    }
}