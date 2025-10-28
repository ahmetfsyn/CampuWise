


using EventService.Domain.Common;

namespace EventService.Domain.EventParticipants.Exceptions
{
    public sealed class DuplicateParticipantException(Guid userId, Guid eventId) : DomainException($"User {userId} has already joined event {eventId}.")
    {
    }
}