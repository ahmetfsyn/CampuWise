using EventService.Domain.Common;

namespace EventService.Domain.EventParticipants.Exceptions
{
    public class CannotLeaveEventException : DomainException
    {
        public CannotLeaveEventException()
            : base("Participant can not leave event", 403)
        {
        }

        public CannotLeaveEventException(string message, int statusCode = 403)
            : base(message, statusCode)
        {
        }
    }
}