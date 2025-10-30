using FluentValidation;

namespace UserService.Application.User.Commands
{
    public sealed class RefreshTokenValidator : AbstractValidator<RefreshTokenCommand>
    {
        public RefreshTokenValidator()
        {
            RuleFor(x => x.RefreshToken)
                .NotEmpty().WithMessage("Refresh token boş olamaz.");
        }
    }
}