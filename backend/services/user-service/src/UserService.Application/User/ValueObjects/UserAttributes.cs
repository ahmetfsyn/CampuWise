
namespace UserService.Application.User.ValueObjects
{
	public record UserAttributes(
		 string? PhoneNumber ,
		 string? AvatarUrl ,
		 string? University ,
		 string? Department
	 );
}