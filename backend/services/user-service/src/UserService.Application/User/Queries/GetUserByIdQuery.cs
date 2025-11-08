
using Cortex.Mediator.Queries;
using TS.Result;
using UserService.Application.User.DTOs;

namespace UserService.Application.User.Queries
{
    public record GetUserByIdQuery(
        Guid UserId
    ) : IQuery<Result<GetUserByIdResponseDto>>;
}