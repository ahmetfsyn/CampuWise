using Cortex.Mediator;
using Mapster;
using TS.Result;
using UserService.Application.User.Commands;
using UserService.Application.User.DTOs;
using UserService.Application.User.Queries;
using UserService.WebApi.Extensions;

namespace UserService.WebApi.Modules
{
    public static class UserModule
    {
        public static void RegisterUserRoutes(this IEndpointRouteBuilder app)
        {
            RouteGroupBuilder group = app.MapGroup("/users").WithTags("User");

            group.MapPost("details",
                  async (IMediator mediator, UserDetailsRequestDto request, CancellationToken cancellationToken) =>
                  {

                      var command = request.Adapt<UserDetailsCommand>();
                      var result = await mediator.SendCommandAsync<UserDetailsCommand, Result<List<UserDetailsResponseDto>>>(command, cancellationToken);

                      return result;
                  })
                  .Produces<Result<List<UserDetailsResponseDto>>>();

            // todo : alttaki endpointin handlerını ve geri kalanını tamamla.
            group.MapGet("me", async (IMediator mediator, HttpContext httpContext, CancellationToken cancellationToken) =>
        {
            var userId = httpContext.GetUserId();

            var query = new GetUserByIdQuery(userId);

            var result = await mediator.SendQueryAsync<GetUserByIdQuery, Result<GetUserByIdResponseDto>>(query, cancellationToken);

            return result;
        })
        .RequireAuthorization()
        .Produces<Result<GetUserByIdResponseDto>>();

            // todo : burada iki tane endpoin ekle biri /me biri de /{id} olacak.
            // group.MapGet("/me", async())

        }
    }
}