using Cortex.Mediator.Commands;
using TS.Result;

namespace EventService.Application.EventParticipants.Commands
{
    public record JoinEventCommand(
        Guid EventId,
        Guid UserId
    ) : ICommand<Result<string>>;
}