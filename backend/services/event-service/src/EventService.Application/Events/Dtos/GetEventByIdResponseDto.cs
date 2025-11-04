
using EventService.Application.Interfaces;

namespace EventService.Application.Events.Dtos
{
    public record GetEventByIdResponseDto(

       Guid Id,
        string Title,
        string Description,
        string Place,
        DateTimeOffset? StartDate,
        string? ImageUrl,
        Guid? OrganizerId,
        ICollection<ParticipantDetailsResponseDto> Participants

    );
}