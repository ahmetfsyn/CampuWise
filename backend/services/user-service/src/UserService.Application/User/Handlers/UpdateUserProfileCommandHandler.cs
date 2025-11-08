

using Cortex.Mediator.Commands;
using TS.Result;
using UserService.Application.Interfaces;
using UserService.Application.User.Commands;
using UserService.Application.User.DTOs;

namespace UserService.Application.User.Handlers
{
	public class UpdateUserProfileCommandHandler(
		IKeycloakUserService keycloakService
	) : ICommandHandler<UpdateUserProfileCommand, Result<UserProfileResponseDto>>
	{
		public async Task<Result<UserProfileResponseDto>> Handle(UpdateUserProfileCommand command, CancellationToken cancellationToken)
        {
            var result = await keycloakService.UpdateUserProfileAsync(command);

			return result;
        }
	}
}