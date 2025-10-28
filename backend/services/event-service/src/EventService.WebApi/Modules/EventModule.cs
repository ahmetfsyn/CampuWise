using Cortex.Mediator;
using EventService.Application.EventParticipants.Commands;
using EventService.Application.EventParticipants.Dtos;
using EventService.Application.Events.commands;
using Mapster;
using TS.Result;

namespace EventService.WebApi.Modules
{
    public static class EventModule
    {

        public static void RegisterEventRoutes(this IEndpointRouteBuilder app)
        {
            RouteGroupBuilder group = app.MapGroup("/events").WithTags("Events");

            group.MapPost("/",
               async (IMediator mediator, CreateEventCommand request, CancellationToken cancellationToken) =>
               {
                   var response = await mediator.SendCommandAsync<CreateEventCommand, Result<Guid>>(request, cancellationToken);
                   return response;
               })
               .Produces<Result<Guid>>();

            group.MapPost("/{eventId}/join",
                async (Guid eventId, IMediator mediator, JoinEventRequestDto request, CancellationToken cancellationToken) =>
                {

                    var joinEventCommand = new
                    {
                        EventId = eventId,
                        request.UserId
                    }.Adapt<JoinEventCommand>();

                    var response = await mediator.SendCommandAsync<JoinEventCommand, Result<string>>(joinEventCommand, cancellationToken);
                    return response;
                })
                .Produces<Result<string>>();

            group.MapPost("/{eventId}/leave",
            async (Guid eventId, IMediator mediator, LeaveEventRequestDto request, CancellationToken cancellationToken) =>
            {

                var leaveEventCommand = new
                {
                    EventId = eventId,
                    request.UserId
                }.Adapt<LeaveEventCommand>();

                var response = await mediator.SendCommandAsync<LeaveEventCommand, Result<string>>(leaveEventCommand, cancellationToken);
                return response;
            })
            .Produces<Result<string>>();

        }
    }
}