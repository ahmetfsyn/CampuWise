using Cortex.Mediator.Commands;
using FluentValidation;
using TS.Result;
using UserService.Application.User.DTOs;

namespace UserService.Application.User.Commands
{
    public record UserDetailsCommand(
        List<Guid> Ids
    ) : ICommand<Result<List<UserDetailsResponseDto>>>;
}