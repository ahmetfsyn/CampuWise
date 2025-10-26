using Mapster;
using MediatR;
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
            async (ISender sender, LoginRequestDto request, CancellationToken cancellationToken) =>
            {

                var command = request.Adapt<LoginCommand>();
                var result = await sender.Send(command, cancellationToken);
                return result.IsSuccessful ? Result<LoginResponseDto>.Succeed(result.Data) : Result<LoginResponseDto>.Failure("Giriş Başarısız");
            })
            .Produces<Result<LoginResponseDto>>();

            group.MapPost("/refresh-token", async (ISender sender, RefreshTokenRequestDto request, CancellationToken cancellationToken) =>
            {
                var command = request.Adapt<RefreshTokenCommand>();
                var result = await sender.Send(command, cancellationToken);

                return result.IsSuccessful
                    ? Result<LoginResponseDto>.Succeed(result.Data)
                    : Result<LoginResponseDto>.Failure("Refresh token failed");
            });


            group.MapPost("/register", async (ISender sender, RegisterRequestDto request, CancellationToken cancellationToken) =>
            {

                var command = request.Adapt<RegisterCommand>();
                var result = await sender.Send(command, cancellationToken);
                return result.IsSuccessful ? Results.Created() : Results.InternalServerError(result);
            });


        }
    }
}