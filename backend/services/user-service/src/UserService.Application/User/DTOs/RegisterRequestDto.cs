
namespace UserService.Application.User.DTOs
{
    public record RegisterRequestDto
    {
        public string FullName { get; set; } = default!;
        public string Password { get; set; } = default!;
        public string Email { get; set; } = default!;
    }
}