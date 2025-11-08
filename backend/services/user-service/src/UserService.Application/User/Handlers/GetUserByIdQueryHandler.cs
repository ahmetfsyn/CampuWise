
using Cortex.Mediator.Queries;
using TS.Result;
using UserService.Application.Interfaces;
using UserService.Application.User.DTOs;
using UserService.Application.User.Queries;

namespace UserService.Application.User.Handlers;

public class GetUserByIdQueryHandler(
    IKeycloakService keycloakService
) : IQueryHandler<GetUserByIdQuery, Result<GetUserByIdResponseDto>>
{
    public async Task<Result<GetUserByIdResponseDto>> Handle(GetUserByIdQuery query, CancellationToken cancellationToken)
    {

        var user = await keycloakService.GetUserByIdAsync(query.UserId);

        return Result<GetUserByIdResponseDto>.Succeed(user);

    }
}