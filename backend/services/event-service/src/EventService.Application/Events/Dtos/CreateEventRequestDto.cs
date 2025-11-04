namespace EventService.Application.Events.Dtos
{
    public record CreateEventRequestDto(
        string Title,
        string Description,
        string Category,
        string Place,
        DateTimeOffset? StartDate,
        List<string>? Tags = default,
        string? ImageUrl = default
        );

}