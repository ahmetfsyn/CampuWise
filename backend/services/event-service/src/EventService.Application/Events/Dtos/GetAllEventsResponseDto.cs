using EventService.Domain.Events;

namespace EventService.Application.Events.Dtos
{
    public record GetAllEventsResponseDto(
        Guid Id,
        string Title,
        DateTime? StartDate,
        string Description,
        string Place,
        ICollection<string>? Tags,
        Category Category,
        string? ImageUrl,
        Guid OrganizerId
    );
}