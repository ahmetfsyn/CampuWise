using EventService.Domain.Common;

namespace EventService.Domain.Events.Exceptions
{
    public class EventNotFoundException() : DomainException($"Event was not found.", statusCode: 404)
    {
    }
}