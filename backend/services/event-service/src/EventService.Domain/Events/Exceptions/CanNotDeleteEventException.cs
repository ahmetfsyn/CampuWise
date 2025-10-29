using EventService.Domain.Common;

namespace EventService.Domain.Events.Exceptions
{
    public class CanNotDeleteEventException(string message = "Can not delete event", int statusCode = 403) : DomainException(message, statusCode)
    {
    }
}