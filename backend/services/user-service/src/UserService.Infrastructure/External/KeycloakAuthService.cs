using Flurl.Http;
using Mapster;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using UserService.Application.Interfaces;
using UserService.Application.User.DTOs;
using UserService.Domain.Users;
using UserService.Infrastructure.Helpers;

namespace UserService.Infrastructure.External;

	public class KeycloakAuthService(
		IConfiguration configuration,
		ILogger<KeycloakAuthService> logger
	) : IKeycloakAuthService
	{
		public async Task<LoginResponseDto> LoginAsync(string email, string password)
		{
			logger.LogInformation("Starting Keycloak login for {Email}", email);

			try
			{
				var response = await $"{configuration["Keycloak:BaseUrl"]}/realms/{configuration["Keycloak:Realm"]}/protocol/openid-connect/token"
					.PostUrlEncodedAsync(new
					{
						grant_type = "password",
						client_id = configuration["Keycloak:ClientId"],
						client_secret = configuration["Keycloak:ClientSecret"],
						username = email,
						password
					});

				var responseBody = await response.ResponseMessage.Content.ReadAsStringAsync();
				logger.LogDebug("Keycloak login response: {ResponseBody}", responseBody);

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


				logger.LogInformation("Keycloak login succeeded for {Email}", email);
				return tokenDetails;
			}
			catch (Exception ex)
			{
				logger.LogError(ex, ex.Message + " for {Email}", email);
				throw;
			}
		}

		public async Task<LoginResponseDto> RefreshTokenAsync(string refreshToken)
		{
			var response = await $"{configuration["Keycloak:BaseUrl"]}/realms/{configuration["Keycloak:Realm"]}/protocol/openid-connect/token"
				.PostUrlEncodedAsync(new
				{
					grant_type = "refresh_token",
					client_id = configuration["Keycloak:ClientId"],
					client_secret = configuration["Keycloak:ClientSecret"],
					refresh_token = refreshToken
				});

			var responseBody = await response.ResponseMessage.Content.ReadAsStringAsync();

			logger.LogDebug("Keycloak refresh token response: {ResponseBody}", responseBody);

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
			var (firstName, lastName) = KeycloakHelper.GetFirstNameAndLastName(fullName);
			var adminToken = await KeycloakHelper.GetAdminTokenAsync(configuration);

			var avatarUrl = $"https://avatar.iran.liara.run/username?username={firstName + lastName}";
			var defaultPhoneNumber = "0000000000";

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
			};

			await $"{configuration["Keycloak:BaseUrl"]}/admin/realms/{configuration["Keycloak:Realm"]}/users"
				.WithHeader("Authorization", $"Bearer {adminToken}")
				.WithHeader("Accept", "application/json")
				.PostJsonAsync(user);
		}

	}
