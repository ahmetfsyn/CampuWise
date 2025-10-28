using EventService.Domain.Common;
using EventService.Domain.EventParticipants;

namespace EventService.Domain.Events
{
    public class Event : BaseEntity
    {
        public string Title { get; set; } = default!;
        // StartDate normalde null gönderilmemesi gerekiyor. fakat fluent validation yakalasın diye nullable yaptım
        public DateTime? StartDate { get; set; }
        public string Description { get; set; } = default!;
        public string Place { get; set; } = default!;
        public Category Category { get; set; }
        public ICollection<string>? Tags { get; set; }
        public string? ImageUrl { get; set; }
        public Guid? OrganizerId { get; set; }
        public ICollection<EventParticipant> Participants { get; set; } = new List<EventParticipant>();
    }
}