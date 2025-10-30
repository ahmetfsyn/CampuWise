using Cortex.Mediator.Queries;
using EventService.Application.Events.Queries;
using EventService.Domain.Events;

namespace EventService.Application.Events.Handlers
{
    public class EventGetAllQueryHandler(
        IEventRepository eventRepository
    ) : IQueryHandler<EventGetAllQuery, IQueryable<Event>>
    {
        private readonly IEventRepository _eventRepository = eventRepository;

        public async Task<IQueryable<Event>> Handle(EventGetAllQuery query, CancellationToken cancellationToken)
        {
            var response = _eventRepository.GetAll();

            return await Task.FromResult(response);
        }
    }
}