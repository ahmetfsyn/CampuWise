using Cortex.Mediator.Commands;
using FluentValidation;

namespace EventService.Application.Behaviors
{
    public sealed class ValidationBehavior<TCommand, TResult>(IEnumerable<IValidator<TCommand>> validators) : ICommandPipelineBehavior<TCommand, TResult>
    where TCommand : ICommand<TResult>
    {
        private readonly IEnumerable<IValidator<TCommand>> _validators = validators ?? [];

        public async Task<TResult> Handle(TCommand command, CommandHandlerDelegate<TResult> next, CancellationToken cancellationToken)
        {
            if (_validators.Any())
            {
                var context = new ValidationContext<TCommand>(command);
                var failures = _validators
                    .Select(v => v.Validate(context))
                    .SelectMany(r => r.Errors)
                    .Where(f => f != null)
                    .ToList();

                if (failures.Count != 0)
                {
                    throw new Cortex.Mediator.Exceptions.ValidationException(
                        failures.GroupBy(f => f.PropertyName)
                                .ToDictionary(
                                    g => g.Key,
                                    g => g.Select(f => f.ErrorMessage).ToArray()
                                ));
                }
            }

            return await next();
        }
    }
}