using Cortex.Mediator.Queries;

using TS.Result;

using UserService.Application.Interfaces;
using UserService.Application.User.DTOs;
using UserService.Application.User.Queries;

namespace UserService.Application.User.Handlers
{
    public class GetUserProfileByIdQueryHandler(
    IKeycloakUserService keycloakService
    ) : IQueryHandler<GetUserProfileByIdQuery, Result<UserProfileResponseDto>>
    {
        public async Task<Result<UserProfileResponseDto>> Handle(GetUserProfileByIdQuery query, CancellationToken cancellationToken){

            var user = await keycloakService.GetUserProfileByIdAsync(query.UserId , query.IncludePrivateAttributes);

            return Result<UserProfileResponseDto>.Succeed(user);
        }
    }
}
