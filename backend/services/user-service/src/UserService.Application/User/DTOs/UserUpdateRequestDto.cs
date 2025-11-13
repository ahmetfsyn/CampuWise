namespace UserService.Application.User.DTOs
{
	public record UserUpdateRequestDto(
		string? PhoneNumber,
		string? University,
		string? Department,
		string? AvatarUrl
	);
}
