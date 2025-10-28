using Ardalis.Specification;
using EventService.Domain.Events;

namespace EventService.Application.Events
{
    public interface IEventRepository : IRepositoryBase<Event> { }
}