using EventService.Domain.Events;

namespace EventService.Domain.EventParticipants
{
    public class EventParticipant
    {
        public Guid EventId { get; set; }
        public Event Event { get; set; } = default!;
        public Guid UserId { get; set; }
        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
    }
}