using Cortex.Mediator.Commands;
using TS.Result;
using UserService.Application.User.DTOs;
using UserService.Application.User.ValueObjects;

namespace UserService.Application.User.Commands
{
    public record UpdateUserProfileCommand(
        Guid Id,
        string? FirstName = null,
        string? LastName = null,
        UserAttributes? Attributes = null
    ) : ICommand<Result<UserProfileResponseDto>>;
}