using Flurl.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UserService.Application.Interfaces;
using UserService.Application.User.Commands;
using UserService.Application.User.DTOs;
using UserService.Application.User.ValueObjects;
using UserService.Infrastructure.Helpers;

namespace UserService.Infrastructure.External;

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
			Id: Guid.Parse((string) user["id"]),
			FullName: $"{(string?) user["firstName"]} {(string?) user["lastName"]}".Trim(),
			Email: (string?) user["email"],
			Attributes: userAttributes
		);
	}



	private async Task<JObject> GetUserByIdAsync(Guid userId)
	{
		var adminToken = await KeycloakHelper.GetAdminTokenAsync(configuration);
		var baseUrl = $"{configuration["Keycloak:BaseUrl"]}/admin/realms/{configuration["Keycloak:Realm"]}/users/{userId}";

		var response = await baseUrl
			.WithHeader("Authorization", $"Bearer {adminToken}")
			.GetAsync();

		var body = await response.ResponseMessage.Content.ReadAsStringAsync();
		var user = JsonConvert.DeserializeObject<JObject>(body) ?? throw new Exception("Failed to get user details");

		return user;
	}



	// ! aşağıdaki metodu uygulamayı bitirene kadar sakın elleme suanki haliyle calısıyor.

	public async Task<UserProfileResponseDto> UpdateUserProfileAsync(UpdateUserProfileCommand command)
	{
		var adminToken = await KeycloakHelper.GetAdminTokenAsync(configuration);
		var baseUrl = $"{configuration["Keycloak:BaseUrl"]}/admin/realms/{configuration["Keycloak:Realm"]}/users/{command.Id}";

		// Mevcut kullanıcıyı al
		var existingUser = await GetUserByIdAsync(command.Id);
		// attributes dictionary varsa, sadece ilgili alanları güncelle

		JObject attributes = existingUser["attributes"] as JObject ?? [];

		if (!string.IsNullOrWhiteSpace(command.PhoneNumber))
			attributes["phoneNumber"] = new JArray(command.PhoneNumber);
		if (!string.IsNullOrWhiteSpace(command.AvatarUrl))
			attributes["avatarUrl"] = new JArray(command.AvatarUrl);
		if (!string.IsNullOrWhiteSpace(command.University))
			attributes["university"] = new JArray(command.University);
		if (!string.IsNullOrWhiteSpace(command.Department))
			attributes["department"] = new JArray(command.Department);

		existingUser["attributes"] = attributes;

		var payload = new
		{
			email = existingUser["email"]?.ToString(),
			firstName = existingUser["firstName"]?.ToString(),
			lastName = existingUser["lastName"]?.ToString(),
			emailVerified = existingUser["emailVerified"]?.ToObject<bool>(),
			attributes = existingUser["attributes"]?.ToObject<Dictionary<string, object[]>>()
		};

		// Keycloak Admin API PUT
		await baseUrl
			.WithHeader("Authorization", $"Bearer {adminToken}")
			.WithHeader("Accept", "application/json")
			.PutJsonAsync(payload);

		// Güncel kullanıcı profilini döndür
		return await GetUserProfileByIdAsync(command.Id, true);
	}


}
