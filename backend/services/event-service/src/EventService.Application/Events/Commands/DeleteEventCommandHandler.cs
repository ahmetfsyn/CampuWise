

using Cortex.Mediator.Commands;
using EventService.Application.Events.Dtos;
using EventService.Domain.Events.Exceptions;
using TS.Result;

namespace EventService.Application.Events.Commands
{
    public class DeleteEventCommandHandler(
        IEventRepository eventRepository,
        IUnitOfWork unitOfWork
    ) : ICommandHandler<DeleteEventCommand, Result<string>>
    {

        private readonly IEventRepository _eventRepository = eventRepository;
        private readonly IUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Result<string>> Handle(DeleteEventCommand command, CancellationToken cancellationToken)
        {

            await _unitOfWork.BeginTransactionAsync();

            var @event = await _eventRepository.FirstOrDefaultAsync(e => e.Id == command.EventId, cancellationToken) ?? throw new EventNotFoundException();

            var isOrganizer = @event.OrganizerId == command.UserId;

            if (!isOrganizer)
            {
                throw new CanNotDeleteEventException();
            }

            _eventRepository.Delete(@event);

            await _unitOfWork.CommitAsync(cancellationToken);
            return Result<string>.Succeed("Event deleted successfully.");
        }
    }
}