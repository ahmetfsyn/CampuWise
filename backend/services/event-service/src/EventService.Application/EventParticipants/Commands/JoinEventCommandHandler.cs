using Cortex.Mediator.Commands;
using EventService.Application.Events;
using EventService.Domain.Events.Exceptions;
using TS.Result;

namespace EventService.Application.EventParticipants.Commands
{
    public class JoinEventCommandHandler(
                IEventRepository eventRepository,
                IUnitOfWork unitOfWork
                ) : ICommandHandler<JoinEventCommand, Result<string>>
    {

        private readonly IEventRepository _eventRepository = eventRepository;
        private readonly IUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Result<string>> Handle(JoinEventCommand command, CancellationToken cancellationToken)
        {
            var @event = await _eventRepository.FirstOrDefaultAsync(e => e.Id == command.EventId, cancellationToken) ?? throw new EventNotFoundException();
            @event.AddParticipant(command.UserId);
            await _unitOfWork.CommitAsync(cancellationToken);

            return Result<string>.Succeed("User joined successfully.");
        }
    }

}