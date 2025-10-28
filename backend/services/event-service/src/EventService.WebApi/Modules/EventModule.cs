using Cortex.Mediator;
using EventService.Application.Events.commands;
using Mapster;
using Microsoft.AspNetCore.Mvc;
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

        }
    }
}