using EventService.Domain.Common;

namespace EventService.Domain.EventParticipants.Exceptions
{
    public class EventParticipantNotFoundException(Guid userId, int statusCode = 404) : DomainException($"Participant with ID '{userId}' was not found.", statusCode)
    {
        public Guid UserId { get; } = userId;
    }
}