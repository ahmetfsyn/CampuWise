using UserService.Application.User.ValueObjects;

namespace UserService.Application.User.DTOs
{
	public record UserProfileResponseDto(
		Guid Id,
		string? FullName,
		string? Email,
		UserAttributes? Attributes
	);
}
