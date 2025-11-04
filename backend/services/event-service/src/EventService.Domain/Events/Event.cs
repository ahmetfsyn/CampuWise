using EventService.Domain.Common;
using EventService.Domain.EventParticipants;
using EventService.Domain.EventParticipants.Exceptions;

namespace EventService.Domain.Events
{
    public class Event : BaseEntity
    {
        public string Title { get; set; } = default!;
        // StartDate normalde null gönderilmemesi gerekiyor. fakat fluent validation yakalasın diye nullable yaptım
        public DateTimeOffset? StartDate { get; set; }
        public string Description { get; set; } = default!;
        public string Place { get; set; } = default!;
        public Category Category { get; set; }
        public ICollection<string>? Tags { get; set; }
        public string? ImageUrl { get; set; }
        public Guid? OrganizerId { get; set; }
        public ICollection<EventParticipant> Participants { get; set; } = [];


        public void AddParticipant(Guid userId)
        {
            if (Participants.Any(p => p.UserId == userId))
                throw new DuplicateParticipantException(userId, Id);

            Participants.Add(new EventParticipant { UserId = userId, EventId = Id });
        }

        public void RemoveParticipant(Guid userId)
        {
            if (userId == OrganizerId)
                throw new CannotLeaveEventException("Organizer cannot leave their own event.");

            var participant = Participants.FirstOrDefault(p => p.UserId == userId) ?? throw new ParticipantNotFoundException();

            Participants.Remove(participant);
        }
    }
}