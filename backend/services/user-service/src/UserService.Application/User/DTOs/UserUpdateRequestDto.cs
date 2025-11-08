namespace UserService.Application.User.DTOs
{
	public record UserUpdateRequestDto(
		string? FirstName,
		string? LastName,
		string? PhoneNumber,
		string? University,
		string? Department,
		string? AvatarUrl
	);
}
