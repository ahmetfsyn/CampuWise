using FluentValidation;
using UserService.Application.User.Commands;

namespace UserService.Application.User.Validators
{
    public sealed class UserDetailsCommandValidator : AbstractValidator<UserDetailsCommand>
    {
        public UserDetailsCommandValidator()
        {

            RuleFor(x => x.Ids)
                .NotEmpty().WithMessage("Ids can't be empty.");

        }
    }


}