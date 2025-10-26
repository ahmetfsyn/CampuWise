using FluentValidation;
using MediatR;
using TS.Result;
using UserService.Application.Interfaces;
using UserService.Application.User.DTOs;

namespace UserService.Application.User.Commands
{
    public record RefreshTokenCommand(
        string RefreshToken
    ) : IRequest<Result<LoginResponseDto>>;

    public sealed class RefreshTokenValidator : AbstractValidator<RefreshTokenCommand>
    {
        public RefreshTokenValidator()
        {
            RuleFor(x => x.RefreshToken)
                .NotEmpty().WithMessage("Refresh token boş olamaz.");
        }
    }

    public class RefreshTokenHandler : IRequestHandler<RefreshTokenCommand, Result<LoginResponseDto>>
    {
        private readonly IKeycloakService _keycloakService;

        public RefreshTokenHandler(IKeycloakService keycloakService) => _keycloakService = keycloakService;

        public async Task<Result<LoginResponseDto>> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
        {

            var token = await _keycloakService.RefreshTokenAsync(request.RefreshToken);

            return token.AccessToken != string.Empty
                ? Result<LoginResponseDto>.Succeed(token)
                : Result<LoginResponseDto>.Failure("Refresh token failed");

        }
    }
}