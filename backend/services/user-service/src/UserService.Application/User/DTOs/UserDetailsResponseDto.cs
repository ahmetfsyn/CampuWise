namespace UserService.Application.User.DTOs
{
	public record UserDetailsResponseDto(
		Guid Id,
		string FullName,
		string AvatarUrl,
		string Email,
		string FirstName,
		string LastName,
		string? PhoneNumber
	);
}
