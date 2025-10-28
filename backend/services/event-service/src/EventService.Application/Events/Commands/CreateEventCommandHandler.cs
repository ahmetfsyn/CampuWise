using Cortex.Mediator.Commands;
using EventService.Domain.Events;
using Mapster;
using TS.Result;

namespace EventService.Application.Events.commands
{
    public class CreateEventCommandHandler(
        IEventRepository eventRepository,
        IUnitOfWork unitOfWork)
        : ICommandHandler<CreateEventCommand, Result<Guid>>
    {
        private readonly IEventRepository _eventRepository = eventRepository;
        private readonly IUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Result<Guid>> Handle(CreateEventCommand command, CancellationToken cancellationToken)
        {
            await _unitOfWork.BeginTransactionAsync();

            var newEvent = command.Adapt<Event>();
            var result = await _eventRepository.AddAsync(newEvent, cancellationToken);

            await _unitOfWork.CommitAsync(cancellationToken);

            return result is not null ? Result<Guid>.Succeed(result.Id) : Result<Guid>.Failure("Event could not be created");
        }
    }
}