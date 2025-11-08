using Cortex.Mediator.Commands;
using TS.Result;
using UserService.Application.Interfaces;
using UserService.Application.User.Commands;
using UserService.Application.User.DTOs;

namespace UserService.Application.User.Handlers
{
    public class RefreshTokenHandler(IKeycloakAuthService keycloakService) : ICommandHandler<RefreshTokenCommand, Result<LoginResponseDto>>
    {

        public async Task<Result<LoginResponseDto>> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
        {

            var token = await keycloakService.RefreshTokenAsync(request.RefreshToken);

            return token.AccessToken != string.Empty
                ? Result<LoginResponseDto>.Succeed(token)
                : Result<LoginResponseDto>.Failure("Refresh token failed");

        }
    }
}