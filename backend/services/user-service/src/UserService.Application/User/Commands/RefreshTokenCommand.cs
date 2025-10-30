using Cortex.Mediator.Commands;
using TS.Result;
using UserService.Application.User.DTOs;

namespace UserService.Application.User.Commands
{
    public record RefreshTokenCommand(
        string RefreshToken
    ) : ICommand<Result<LoginResponseDto>>;
}