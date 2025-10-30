using Cortex.Mediator;
using EventService.Application.EventParticipants.Commands;
using EventService.Application.Events.commands;
using EventService.Application.Events.Commands;
using EventService.Application.Events.Dtos;
using EventService.Application.Events.Queries;
using EventService.Domain.Events;
using EventService.WebApi.Extensions;
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
                async (IMediator mediator, CreateEventRequestDto request, HttpContext httpContext, CancellationToken cancellationToken) =>
                {
                    var organizerId = httpContext.GetUserId();

                    var createEventCommand = new
                    {
                        OrganizerId = organizerId,
                        request.Category,
                        request.Title,
                        request.Description,
                        request.StartDate,
                        request.Place,
                        request.ImageUrl,
                        request.Tags
                    }.Adapt<CreateEventCommand>();

                    var response = await mediator.SendCommandAsync<CreateEventCommand, Result<Guid>>(createEventCommand, cancellationToken);
                    return response;
                })
                .RequireAuthorization()
                .Produces<Result<Guid>>();

            group.MapPost("/{eventId}/join",
                async (Guid eventId, IMediator mediator, HttpContext httpContext, CancellationToken cancellationToken) =>
                {

                    var userId = httpContext.GetUserId();
                    var joinEventCommand = new JoinEventCommand(eventId, userId);

                    var response = await mediator.SendCommandAsync<JoinEventCommand, Result<string>>(joinEventCommand, cancellationToken);
                    return response;
                })
                .RequireAuthorization()
                .Produces<Result<string>>();

            group.MapPost("/{eventId}/leave",
            async (Guid eventId, IMediator mediator, HttpContext httpContext, CancellationToken cancellationToken) =>
            {

                var userId = httpContext.GetUserId();

                var leaveEventCommand = new
                {
                    EventId = eventId,
                    UserId = userId
                }.Adapt<LeaveEventCommand>();

                var response = await mediator.SendCommandAsync<LeaveEventCommand, Result<string>>(leaveEventCommand, cancellationToken);
                return response;
            })
                .RequireAuthorization()
                .Produces<Result<string>>();


            group.MapDelete("/{eventId}", async (Guid eventId, IMediator mediator, HttpContext httpContext, CancellationToken cancellationToken) =>
            {
                var userId = httpContext.GetUserId();
                var deleteEventCommand = new
                {
                    EventId = eventId,
                    UserId = userId
                }.Adapt<DeleteEventCommand>();

                var response = await mediator.SendCommandAsync<DeleteEventCommand, Result<string>>(deleteEventCommand, cancellationToken);
                return response;
            })
            .RequireAuthorization()
            .Produces<Result<string>>();


            group.MapGet("/{eventId}", async (Guid eventId, IMediator mediator, CancellationToken cancellationToken) =>
                {
                    var query = new GetEventByIdQuery(eventId);

                    // todo : yapmam gereken şey user-service http il istek atıp katılımcıların (yani userların) avatarUrl verisini eventDetailse eklemek ve öyle frontende gondermek.

                    var response = await mediator.SendQueryAsync<GetEventByIdQuery, Result<GetEventByIdResponseDto>>(query, cancellationToken);
                    return response;
                })
                .Produces<Result<Event>>();

        }
    }
}