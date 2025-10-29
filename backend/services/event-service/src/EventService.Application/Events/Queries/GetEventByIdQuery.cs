

using Cortex.Mediator.Queries;
using EventService.Domain.Events;
using TS.Result;

namespace EventService.Application.Events.Queries
{
    public record GetEventByIdQuery(
        Guid Id
    ) : IQuery<Result<Event>>;
}