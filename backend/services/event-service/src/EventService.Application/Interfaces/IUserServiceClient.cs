
using EventService.Application.EventParticipants.Dtos;

namespace EventService.Application.Interfaces
{
    public interface IUserServiceClient
    {
        Task<List<ParticipantDetailsResponseDto>> GetParticipantDetailsAsync(List<Guid> userIds);

    }
}