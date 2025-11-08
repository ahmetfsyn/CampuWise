
namespace UserService.Application.User.ValueObjects
{
	public record UserAttributes(
		 string? PhoneNumber = null,
		 string? AvatarUrl = null,
		 string? University = null,
		 string? Department = null
	 );
}