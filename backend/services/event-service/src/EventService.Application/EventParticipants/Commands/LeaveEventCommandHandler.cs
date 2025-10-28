using Cortex.Mediator.Commands;
using EventService.Application.Events;
using EventService.Domain.EventParticipants.Exceptions;
using EventService.Domain.Events.Exceptions;
using Microsoft.EntityFrameworkCore;
using TS.Result;

namespace EventService.Application.EventParticipants.Commands
{
    public class LeaveEventCommandHandler(
        IEventRepository eventRepository,
        IUnitOfWork unitOfWork
    ) : ICommandHandler<LeaveEventCommand, Result<string>>
    {
        private readonly IEventRepository _eventRepository = eventRepository;
        private readonly IUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Result<string>> Handle(LeaveEventCommand command, CancellationToken cancellationToken)
        {
            await _unitOfWork.BeginTransactionAsync();

            var @event = await _eventRepository.GetAllWithTracking().Include(e => e.Participants).FirstOrDefaultAsync(e => e.Id == command.EventId, cancellationToken) ?? throw new EventNotFoundException();
            var participant = @event.Participants.FirstOrDefault(p => p.UserId == command.UserId) ?? throw new ParticipantNotFoundException();

            @event.RemoveParticipant(participant.UserId);


            await _unitOfWork.CommitAsync(cancellationToken);

            return Result<string>.Succeed("You have left the event.");
        }
    }
}