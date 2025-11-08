
namespace UserService.Application.User.DTOs
{
    public record GetUserByIdResponseDto(
        Guid? Id,
        string? FullName,
        string? FirstName,
        string? LastName,
        string? Email,
        string? AvatarUrl,
        string? PhoneNumber
    );
}