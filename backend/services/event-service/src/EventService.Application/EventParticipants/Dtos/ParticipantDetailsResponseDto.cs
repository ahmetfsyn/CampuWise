

namespace EventService.Application.EventParticipants.Dtos
{
    public record ParticipantDetailsResponseDto(
        Guid Id,
        string? AvatarUrl,
        string? FullName,
        string? Email
        );

}