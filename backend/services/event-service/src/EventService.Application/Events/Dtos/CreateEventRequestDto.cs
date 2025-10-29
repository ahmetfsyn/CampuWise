namespace EventService.Application.Events.Dtos
{
    public record CreateEventRequestDto(
        string Title,
        string Description,
        string Category,
        string Place,
        DateTime? StartDate,
        List<string>? Tags = default,
        string? ImageUrl = default
        );

}