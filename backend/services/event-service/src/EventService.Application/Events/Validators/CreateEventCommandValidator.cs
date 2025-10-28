using EventService.Application.Events.commands;
using FluentValidation;

namespace EventService.Application.Events.validators;

public class CreateEventCommandValidator : AbstractValidator<CreateEventCommand>
{
    public CreateEventCommandValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Title is required.")
            .MinimumLength(3).WithMessage("Title must be at least 3 characters long.");

        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Description is required.");

        RuleFor(x => x.Category)
            .NotEmpty().WithMessage("Category is required.");

        RuleFor(x => x.StartDate)
        .NotEmpty()
            .WithMessage("Start date is required.")
            .Must(date => date > DateTime.UtcNow)
            .WithMessage("Start date must be in the future.");

        RuleFor(x => x.Place)
        .NotEmpty().WithMessage("Place is required.");

        RuleFor(x => x.OrganizerId)
        .NotEmpty().WithMessage("Organizer is required.");
    }
}