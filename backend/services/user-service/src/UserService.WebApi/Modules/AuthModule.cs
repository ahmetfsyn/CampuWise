using Cortex.Mediator;
using Mapster;
using TS.Result;
using UserService.Application.User.Commands;
using UserService.Application.User.DTOs;

namespace UserService.WebApi.Modules
{
    public static class AuthModule
    {

        public static void RegisterAuthRoutes(this IEndpointRouteBuilder app)
        {
            RouteGroupBuilder group = app.MapGroup("/auth").WithTags("Auth");

            group.MapPost("login",
                     async (IMediator mediator, LoginRequestDto request, CancellationToken cancellationToken) =>
                     {
                         var command = request.Adapt<LoginCommand>();
                         var result = await mediator.SendCommandAsync<LoginCommand, Result<LoginResponseDto>>(command, cancellationToken);
                         return result.IsSuccessful ? Result<LoginResponseDto>.Succeed(result.Data) : Result<LoginResponseDto>.Failure("Giriş Başarısız");
                     })
                     .Produces<Result<LoginResponseDto>>();

            group.MapPost("/refresh-token", async (IMediator mediator, RefreshTokenRequestDto request, CancellationToken cancellationToken) =>
            {
                var command = request.Adapt<RefreshTokenCommand>();
                var result = await mediator.SendCommandAsync<RefreshTokenCommand, Result<LoginResponseDto>>(command, cancellationToken);

                return result.IsSuccessful
                    ? Result<LoginResponseDto>.Succeed(result.Data)
                    : Result<LoginResponseDto>.Failure("Refresh token failed");
            });


            group.MapPost("/register", async (IMediator mediator, RegisterRequestDto request, CancellationToken cancellationToken) =>
            {

                var command = request.Adapt<RegisterCommand>();
                var result = await mediator.SendCommandAsync<RegisterCommand, Result<string>>(command, cancellationToken);
                return result.IsSuccessful ? Results.Created() : Results.InternalServerError(result);
            });


        }
    }
}