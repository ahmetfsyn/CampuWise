using EventService.Application.EventParticipants;
using EventService.Domain.EventParticipants;
using GenericRepository;
using Microsoft.EntityFrameworkCore;

namespace EventService.Infrastructure.Persistence.Repositories
{
    public class EventParticipantRepository(EventDbContext dbContext) : Repository<EventParticipant, EventDbContext>(dbContext), IEventParticipantRepository
    {
        private readonly EventDbContext _dbContext = dbContext;

        public async Task<bool> DeleteByKeysAsync(Guid eventId, Guid userId, CancellationToken cancellationToken)
        {
            var entity = await _dbContext.EventParticipants
                .FirstOrDefaultAsync(ep => ep.EventId == eventId && ep.UserId == userId, cancellationToken);

            if (entity != null)
            {
                _dbContext.EventParticipants.Remove(entity);

                return true;
            }

            return false;
        }
    }
}