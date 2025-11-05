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

                    byte[]? imageBytes = null;
                    if (!string.IsNullOrEmpty(request.ImageBase64))
                    {
                        var base64 = request.ImageBase64;

                        // data:image/jpeg;base64, kısmını at
                        // var commaIndex = base64.IndexOf(',');
                        // if (commaIndex >= 0)
                        //     base64 = base64[(commaIndex + 1)..];

                        // tüm boşlukları, satır sonlarını, kaçış karakterlerini temizle
                        base64 = base64
                            .Trim('"')                 // JSON’dan gelen " işaretlerini at
                            .Replace("\\", "")          // escape karakterlerini kaldır
                            .Replace(" ", "")           // boşluk varsa kaldır
                            .Replace("\r", "")
                            .Replace("\n", "");

                        try
                        {
                            imageBytes = Convert.FromBase64String(base64);
                        }
                        catch (FormatException ex)
                        {
                            Console.WriteLine("❌ Base64 parse hatası: " + ex.Message);
                            Console.WriteLine("🔍 İlk 100 karakter: " + base64.Substring(0, Math.Min(100, base64.Length)));
                            throw;
                        }
                    }

                    var createEventCommand = new
                    {
                        OrganizerId = organizerId,
                        request.Title,
                        request.Description,
                        request.Category,
                        request.Place,
                        request.StartDate,
                        ImageBytes = imageBytes,
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

                    var response = await mediator.SendQueryAsync<GetEventByIdQuery, Result<GetEventByIdResponseDto>>(query, cancellationToken);
                    return response;
                })
                .Produces<Result<Event>>();

        }
    }
}