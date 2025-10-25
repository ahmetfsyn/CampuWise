using FluentValidation;
using MediatR;
using TS.Result;
using UserService.Application.Interfaces;
using UserService.Application.User.DTOs;

namespace UserService.Application.User.Commands
{
    public record LoginCommand(
        string Email,
        string Password
    ) : IRequest<Result<LoginResponseDto>>;

    public sealed class LoginCommandValidator : AbstractValidator<LoginCommand>
    {
        public LoginCommandValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email boş olamaz.")
                .EmailAddress().WithMessage("Geçerli bir email girin.");

            RuleFor(x => x.Password)
                .MinimumLength(6).WithMessage("Şifre en az 6 karakter olmalı.")
                .Matches("[A-Z]").WithMessage("Şifre en az bir büyük harf içermeli.")
                .Matches("[0-9]").WithMessage("Şifre en az bir rakam içermeli.");
        }
    }

    public class LoginCommandHandler : IRequestHandler<LoginCommand, Result<LoginResponseDto>>
    {
        private readonly IKeycloakService _keycloakService;
        public LoginCommandHandler(IKeycloakService keycloakService) => _keycloakService = keycloakService;

        public async Task<Result<LoginResponseDto>> Handle(LoginCommand request, CancellationToken cancellationToken)
        {

            var token = await _keycloakService.LoginAsync(request.Email, request.Password);

            return token is not null ? Result<LoginResponseDto>.Succeed(token) : Result<LoginResponseDto>.Failure("Login failed");
        }
    }
}