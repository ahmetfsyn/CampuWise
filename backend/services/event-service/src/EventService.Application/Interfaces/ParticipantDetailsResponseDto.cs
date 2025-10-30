

namespace EventService.Application.Interfaces
{
    public record ParticipantDetailsResponseDto(
        Guid Id,
        string? AvatarUrl,
        string FullName
    );

}