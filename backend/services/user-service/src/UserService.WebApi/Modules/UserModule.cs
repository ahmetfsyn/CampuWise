using Cortex.Mediator;
using Mapster;
using TS.Result;
using UserService.Application.User.Commands;
using UserService.Application.User.DTOs;

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
        }
    }
}