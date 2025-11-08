using Cortex.Mediator.Queries;
using TS.Result;
using UserService.Application.User.DTOs;

namespace UserService.Application.User.Queries
{
	public record GetUserProfileByIdQuery(Guid UserId, bool IncludePrivateAttributes = false)
		: IQuery<Result<UserProfileResponseDto>>;
}
