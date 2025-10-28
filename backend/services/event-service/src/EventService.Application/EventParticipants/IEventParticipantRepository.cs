using EventService.Domain.EventParticipants;
using GenericRepository;

namespace EventService.Application.EventParticipants
{
    public interface IEventParticipantRepository : IRepository<EventParticipant>
    {
        public Task<bool> DeleteByKeysAsync(Guid eventId, Guid userId, CancellationToken cancellationToken);

    }
}