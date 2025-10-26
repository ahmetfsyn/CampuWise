

namespace UserService.Application.User.DTOs
{
    public record RefreshTokenRequestDto
    {
        public string RefreshToken { get; set; } = string.Empty;
    }
}