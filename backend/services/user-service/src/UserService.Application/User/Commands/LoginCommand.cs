using Cortex.Mediator.Commands;
using TS.Result;
using UserService.Application.User.DTOs;

namespace UserService.Application.User.Commands
{
    public record LoginCommand(
        string Email,
        string Password
    ) : ICommand<Result<LoginResponseDto>>;
}