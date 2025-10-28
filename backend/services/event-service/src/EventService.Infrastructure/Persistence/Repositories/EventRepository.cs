
using Ardalis.Specification.EntityFrameworkCore;
using EventService.Application.Events;
using EventService.Domain.Events;

namespace EventService.Infrastructure.Persistence.Repositories
{
    public class EventRepository(EventDbContext dbContext) : RepositoryBase<Event>(dbContext), IEventRepository
    {
    }
}