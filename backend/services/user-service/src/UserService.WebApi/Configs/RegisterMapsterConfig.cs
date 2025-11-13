using Mapster;
using UserService.Application.User.Commands;
using UserService.Application.User.DTOs;

namespace UserService.WebApi.Configs
{
	public static class RegisterMapsterConfig
	{
		public static void RegisterMappings()
		{
			TypeAdapterConfig<UserUpdateRequestDto, UpdateUserProfileCommand>
				.NewConfig()
				// .Ignore(x => x.Id)
				.IgnoreNullValues(true);
		}
	}
}