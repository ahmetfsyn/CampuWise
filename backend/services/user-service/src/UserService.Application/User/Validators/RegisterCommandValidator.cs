using FluentValidation;
namespace UserService.Application.User.Commands
{
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

}