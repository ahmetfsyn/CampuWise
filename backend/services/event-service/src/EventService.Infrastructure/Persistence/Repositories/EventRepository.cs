using EventService.Application.Events;
using EventService.Domain.Events;
using GenericRepository;

namespace EventService.Infrastructure.Persistence.Repositories
{
    public class EventRepository(EventDbContext context) : Repository<Event, EventDbContext>(context), IEventRepository
    {
    }
}