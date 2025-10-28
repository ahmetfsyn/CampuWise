using EventService.Domain.Events;

namespace EventService.Domain.EventParticipants
{
    public class EventParticipant
    {
        public Guid EventId { get; set; }
        public Guid UserId { get; set; }
        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
        public Event Event { get; set; } = default!;


    }
}