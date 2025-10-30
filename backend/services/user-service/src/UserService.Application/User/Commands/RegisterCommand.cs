using Cortex.Mediator.Commands;
using TS.Result;
namespace UserService.Application.User.Commands
{
    public record RegisterCommand(
        string FullName,
        string Email,
        string Password
    ) : ICommand<Result<string>>;

}