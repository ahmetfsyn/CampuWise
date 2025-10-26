

using UserService.Application.User.DTOs;

namespace UserService.Application.Interfaces
{
    public interface IKeycloakService
    {

        Task<LoginResponseDto> LoginAsync(string email, string password);
        Task<LoginResponseDto> RefreshTokenAsync(string refreshToken);
        Task RegisterAsync(string fullName, string password, string email);


        // Task<UserCustomAttributesDto> GetCustomAttributesAsync(string keycloakId);
        // Task UpdateCustomAttributesAsync(string keycloakId, UserCustomAttributesDto dto);

    }

    // public class UserCustomAttributesDto
    // {
    //     public string? PhoneNumber { get; set; }
    //     public string? AvatarUrl { get; set; }
    // }

}