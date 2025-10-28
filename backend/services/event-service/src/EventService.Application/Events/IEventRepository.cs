using EventService.Domain.Events;
using GenericRepository;

namespace EventService.Application.Events
{
    public interface IEventRepository : IRepository<Event> { }
}