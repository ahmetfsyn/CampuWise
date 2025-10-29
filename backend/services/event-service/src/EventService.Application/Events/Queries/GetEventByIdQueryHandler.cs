using Cortex.Mediator.Queries;
using EventService.Domain.Events;
using EventService.Domain.Events.Exceptions;
using TS.Result;

namespace EventService.Application.Events.Queries
{
    public class GetEventByIdQueryHandler(
        IEventRepository eventRepository
    ) : IQueryHandler<GetEventByIdQuery, Result<Event>>
    {
        private readonly IEventRepository _eventRepository = eventRepository;

        public async Task<Result<Event>> Handle(GetEventByIdQuery query, CancellationToken cancellationToken)
        {
            var @event = await _eventRepository.GetByExpressionAsync(
                e => e.Id == query.Id,
                cancellationToken
            ) ?? throw new EventNotFoundException();
            return Result<Event>.Succeed(@event);
        }
    }
}