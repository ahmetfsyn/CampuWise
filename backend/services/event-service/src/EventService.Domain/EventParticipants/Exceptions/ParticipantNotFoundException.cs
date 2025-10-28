using EventService.Domain.Common;

namespace EventService.Domain.EventParticipants.Exceptions
{
    public sealed class ParticipantNotFoundException() : DomainException($"User is not a participant of event.", statusCode: 404)
    {
    }
}