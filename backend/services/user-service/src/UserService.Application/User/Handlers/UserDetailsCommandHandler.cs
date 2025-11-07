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
      IKeycloakService keycloakService
  ) : ICommandHandler<UserDetailsCommand, Result<List<UserDetailsResponseDto>>>
    {
        private readonly IKeycloakService _keycloakService = keycloakService;

        public async Task<Result<List<UserDetailsResponseDto>>> Handle(UserDetailsCommand command, CancellationToken cancellationToken)
        {
            var rawUsers = await _keycloakService.GetUsersDetailsAsync(command.Ids);

            var users = new List<UserDetailsResponseDto>();

            foreach (var rawUser in rawUsers)
            {
                var json = JsonConvert.DeserializeObject<JObject>(rawUser, NewtonSoftJsonSettings.CamelCase);
                var user = new UserDetailsResponseDto(
                    Guid.Parse(json["id"]!.ToString()),
                    $"{json["firstName"]} {json["lastName"]}",
                    json["attributes"]?["avatarUrl"]?.FirstOrDefault()?.ToString() ?? string.Empty,
                    json["email"]?.ToString() ?? string.Empty
                );
                users.Add(user);
            }

            return Result<List<UserDetailsResponseDto>>.Succeed(users);
        }
    }
}