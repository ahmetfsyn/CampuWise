using Cortex.Mediator.Commands;
using TS.Result;
using UserService.Application.User.DTOs;
using UserService.Application.User.ValueObjects;

namespace UserService.Application.User.Commands
{
    public record UpdateUserProfileCommand(
        Guid Id,
 		string? PhoneNumber ,
		string? AvatarUrl ,
		string? University ,
		string? Department
		) : ICommand<Result<UserProfileResponseDto>>;
}