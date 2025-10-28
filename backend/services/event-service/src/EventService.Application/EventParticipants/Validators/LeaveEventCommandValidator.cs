
using EventService.Application.EventParticipants.Commands;
using FluentValidation;

namespace EventService.Application.EventParticipants.Validators
{
    public class LeaveEventCommandValidator : AbstractValidator<LeaveEventCommand>
    {
        public LeaveEventCommandValidator()
        {

            RuleFor(x => x.EventId)
            .NotEmpty()
                .WithMessage("EventId date is required.");

            RuleFor(x => x.UserId)
            .NotEmpty().WithMessage("UserId is required.");
        }
    }
}