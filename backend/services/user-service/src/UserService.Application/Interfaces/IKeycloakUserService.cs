

using UserService.Application.User.Commands;
using UserService.Application.User.DTOs;

namespace UserService.Application.Interfaces
{
    public interface IKeycloakUserService
    {
		Task<List<string>> GetUsersDetailsAsync(List<Guid> userIds);
		Task<UserProfileResponseDto> GetUserProfileByIdAsync(Guid userId , bool includePrivateAttributes);
		Task<UserProfileResponseDto> UpdateUserProfileAsync(UpdateUserProfileCommand command);

    }
}