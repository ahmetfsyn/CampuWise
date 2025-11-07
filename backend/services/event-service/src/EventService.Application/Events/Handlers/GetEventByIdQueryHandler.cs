using Cortex.Mediator.Queries;
using EventService.Application.EventParticipants;
using EventService.Application.EventParticipants.Dtos;
using EventService.Application.Events.Dtos;
using EventService.Application.Events.Queries;
using EventService.Application.Interfaces;
using EventService.Domain.Events.Exceptions;
using Microsoft.EntityFrameworkCore;
using TS.Result;

namespace EventService.Application.Events.Handlers
{
    public class GetEventByIdQueryHandler(
        IEventRepository eventRepository,
        IEventParticipantRepository eventParticipantRepository,
        IUserServiceClient userServiceClient

    ) : IQueryHandler<GetEventByIdQuery, Result<GetEventByIdResponseDto>>
    {
        private readonly IEventRepository _eventRepository = eventRepository;
        private readonly IEventParticipantRepository _eventParticipantRepository = eventParticipantRepository;
        private readonly IUserServiceClient _userServiceClient = userServiceClient;

        public async Task<Result<GetEventByIdResponseDto>> Handle(GetEventByIdQuery query, CancellationToken cancellationToken)
        {

            var @event = await _eventRepository.GetByExpressionAsync(
                e => e.Id == query.Id,
                cancellationToken
            ) ?? throw new EventNotFoundException();

            var participants = await _eventParticipantRepository.GetAll().Where(ep => ep.EventId == @event.Id).ToListAsync(cancellationToken);

            var participantIds = participants.Select(x => x.UserId).ToList();

            var participantDetails = await _userServiceClient.GetParticipantDetailsAsync(participantIds);

            var eventDto = new GetEventByIdResponseDto(
                Id: @event.Id,
                Title: @event.Title,
                Description: @event.Description,
                Place: @event.Place,
                StartDate: @event.StartDate,
                ImageUrl: @event.ImageUrl,
                OrganizerId: @event.OrganizerId,
                Participants: [.. participantDetails.Select(u => new ParticipantDetailsResponseDto(u.Id, u.AvatarUrl, u.FullName, u.Email))]);

            return Result<GetEventByIdResponseDto>.Succeed(eventDto);

        }
    }
}