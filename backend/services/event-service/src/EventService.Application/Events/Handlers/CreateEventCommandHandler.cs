

using Cortex.Mediator.Commands;
using EventService.Application.Events.commands;
using EventService.Domain.Events;
using Mapster;
using TS.Result;

namespace EventService.Application.Events.Handlers
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

            _eventRepository.Add(newEvent);

            newEvent.AddParticipant(command.OrganizerId ?? throw new ArgumentNullException(nameof(command.OrganizerId)));

            await _unitOfWork.CommitAsync(cancellationToken);

            return Result<Guid>.Succeed(newEvent.Id);
        }
    }
}