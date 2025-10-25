using FluentValidation;
using MediatR;
using TS.Result;
using UserService.Application.Interfaces;
namespace UserService.Application.User.Commands
{
    public record RegisterCommand(
        string FullName,
        string Email,
        string Password
    ) : IRequest<Result<string>>;


    public sealed class RegisterCommandValidator : AbstractValidator<RegisterCommand>
    {
        public RegisterCommandValidator()
        {
            RuleFor(x => x.FullName)
                 .NotNull().WithMessage("Ad-Soyad boş olamaz.")
                 .NotEmpty().WithMessage("Ad-Soyad boş olamaz.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email boş olamaz.")
                .EmailAddress().WithMessage("Geçerli bir email girin.");

            RuleFor(x => x.Password)
            .Cascade(CascadeMode.Continue)
                .MinimumLength(6).WithMessage("Şifre en az 6 karakter olmalı.")
                .Matches("[A-Z]").WithMessage("Şifre en az bir büyük harf içermeli.")
                .Matches("[0-9]").WithMessage("Şifre en az bir rakam içermeli.");
        }
    }


    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, Result<string>>
    {
        private readonly IKeycloakService _keycloakService;
        public RegisterCommandHandler(IKeycloakService keycloakService) => _keycloakService = keycloakService;

        public async Task<Result<string>> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            await _keycloakService.RegisterAsync(
                request.FullName,
                request.Password,
                request.Email);

            return Result<string>.Succeed("User registered successfully");

        }
    }

}