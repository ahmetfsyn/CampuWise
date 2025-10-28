using Ardalis.Specification.EntityFrameworkCore;
using EventService.Application.EventParticipants;
using EventService.Domain.EventParticipants;
using Microsoft.EntityFrameworkCore;

namespace EventService.Infrastructure.Persistence.Repositories
{
    public class EventParticipantRepository(DbContext dbContext) : RepositoryBase<EventParticipant>(dbContext), IEventParticipantRepository
    {
    }
}