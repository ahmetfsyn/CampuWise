
using Cortex.Mediator.Commands;
using TS.Result;

namespace EventService.Application.Events.Commands
{
    public record DeleteEventCommand(
        Guid EventId,
        Guid UserId
    ) : ICommand<Result<string>>;
}