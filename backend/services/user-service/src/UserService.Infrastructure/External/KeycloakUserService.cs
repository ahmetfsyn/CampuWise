using Flurl.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UserService.Application.Interfaces;
using UserService.Application.User.Commands;
using UserService.Application.User.DTOs;
using UserService.Application.User.ValueObjects;
using UserService.Infrastructure.Extensions;
using UserService.Infrastructure.Helpers;

namespace UserService.Infrastructure.External
{
    public class KeycloakUserService(
		IConfiguration configuration,
		ILogger<KeycloakUserService> logger
	) : IKeycloakUserService
    {

    public async Task<List<string>> GetUsersDetailsAsync(List<Guid> userIds)
    {

        var adminToken = await KeycloakHelper.GetAdminTokenAsync(configuration);
        var baseUrl = $"{configuration["Keycloak:BaseUrl"]}/admin/realms/{configuration["Keycloak:Realm"]}/users";
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

public async Task<UserProfileResponseDto> GetUserProfileByIdAsync(Guid userId, bool includePrivateAttributes)
{
    var adminToken = await KeycloakHelper.GetAdminTokenAsync(configuration);
    var baseUrl = $"{configuration["Keycloak:BaseUrl"]}/admin/realms/{configuration["Keycloak:Realm"]}/users/{userId}";

    var response = await baseUrl
        .WithHeader("Authorization", $"Bearer {adminToken}")
        .GetAsync();

    var body = await response.ResponseMessage.Content.ReadAsStringAsync();

    var user = JsonConvert.DeserializeObject<JObject>(body)
        ?? throw new Exception("Failed to get user details");

    var attributes = user["attributes"]?.ToObject<Dictionary<string, string[]>>() ?? new();

    // Ortak alanlar
    var avatarUrl = attributes.TryGetValue("avatarUrl", out var avatarArr) ? avatarArr.FirstOrDefault() : null;
    var university = attributes.TryGetValue("university", out var universityArr) ? universityArr.FirstOrDefault() : null;
    var department = attributes.TryGetValue("department", out var departmentArr) ? departmentArr.FirstOrDefault() : null;

    // Private alanları ekle
    string? phoneNumber = null;
    if (includePrivateAttributes)
    {
        phoneNumber = attributes.TryGetValue("phoneNumber", out var phoneArr) ? phoneArr.FirstOrDefault() : null;
    }

    var userAttributes = new UserAttributes(
        PhoneNumber: phoneNumber,
        AvatarUrl: avatarUrl,
        University: university,
        Department: department
    );

    return new UserProfileResponseDto(
        Id: Guid.Parse((string)user["id"]),
        FullName: $"{(string?)user["firstName"]} {(string?)user["lastName"]}".Trim(),
        Email: (string?)user["email"],
        Attributes: userAttributes
    );
}
	// todo : burda kaldım. buryaı komple gözden geçir .
	public async Task<UserProfileResponseDto> UpdateUserProfileAsync(UpdateUserProfileCommand command)
		{
			// Keycloak admin token al
			var adminToken = await KeycloakHelper.GetAdminTokenAsync(configuration);
			var baseUrl = $"{configuration["Keycloak:BaseUrl"]}/admin/realms/{configuration["Keycloak:Realm"]}/users/{command.Id}";

			// Optional alanları filtrele ve Mapster ile dönüştür
			var attributes = new Dictionary<string, object[]>();
			command.AdaptToTargetWithAttributes(attributes);

			var userUpdateBody = new
			{
				firstName = command.FirstName,
				lastName = command.LastName,
				attributes
			};

			// Keycloak Admin API PUT
			await baseUrl
				.WithHeader("Authorization", $"Bearer {adminToken}")
				.WithHeader("Accept", "application/json")
				.PutJsonAsync(userUpdateBody);

			// Güncel kullanıcı profilini döndür
			return await GetUserProfileByIdAsync(command.Id , true);
		}

    }
}