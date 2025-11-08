

using UserService.Application.User.DTOs;

namespace UserService.Application.Interfaces
{
    public interface IKeycloakAuthService
    {
		Task<LoginResponseDto> LoginAsync(string email, string password);
        Task<LoginResponseDto> RefreshTokenAsync(string refreshToken);
		Task RegisterAsync(string fullName, string password, string email);

    }
}