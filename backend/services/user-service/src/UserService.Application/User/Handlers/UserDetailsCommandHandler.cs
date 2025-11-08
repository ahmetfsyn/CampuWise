using Cortex.Mediator.Commands;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using TS.Result;
using UserService.Application.Interfaces;
using UserService.Application.User.Commands;
using UserService.Application.User.DTOs;
using UserService.Infrastructure.Utilities;

namespace UserService.Application.User.Handlers
{
    public class UserDetailsCommandHandler(
        IKeycloakUserService keycloakService
        ) : ICommandHandler<UserDetailsCommand, Result<List<UserDetailsResponseDto>>>
    {

        public async Task<Result<List<UserDetailsResponseDto>>> Handle(UserDetailsCommand command, CancellationToken cancellationToken)
        {
            var rawUsers = await keycloakService.GetUsersDetailsAsync(command.Ids);

            var users = new List<UserDetailsResponseDto>();

            foreach (var rawUser in rawUsers)
            {
                var json = JsonConvert.DeserializeObject<JObject>(rawUser, NewtonSoftJsonSettings.CamelCase);
                if (json is null)
                {
                    return Result<List<UserDetailsResponseDto>>.Failure("User details not found");
                }
                var user = new UserDetailsResponseDto(
                    Guid.Parse(json["id"]?.ToString() ?? string.Empty),
                    $"{json["firstName"]} {json["lastName"]}",
                    json["attributes"]?["avatarUrl"]?.FirstOrDefault()?.ToString() ?? string.Empty,
                    json["email"]?.ToString() ?? string.Empty,
                    json["firstName"]?.ToString() ?? string.Empty,
                    json["lastName"]?.ToString() ?? string.Empty,
                    json["phoneNumber"]?.ToString() ?? string.Empty
                    );
                users.Add(user);
            }

            return Result<List<UserDetailsResponseDto>>.Succeed(users);
        }
    }
}