
using EventService.Application.Interfaces;

namespace EventService.Application.Events.Dtos
{
    public record GetEventByIdResponseDto(

       Guid Id,
        string Title,
        string Description,
        string Place,
        DateTime? StartDate,
        string? ImageUrl,
        ICollection<ParticipantDetailsResponseDto> Participants

    );
}