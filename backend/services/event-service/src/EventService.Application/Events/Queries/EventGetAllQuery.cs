using Cortex.Mediator.Queries;
using EventService.Domain.Events;

namespace EventService.Application.Events.Queries
{
    public sealed record class EventGetAllQuery() : IQuery<IQueryable<Event>>;

}