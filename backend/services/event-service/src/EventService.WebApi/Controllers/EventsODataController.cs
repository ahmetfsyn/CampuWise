using Cortex.Mediator;
using EventService.Application.Events.Dtos;
using EventService.Application.Events.Queries;
using EventService.Domain.Events;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using TS.Result;

namespace EventService.WebApi.Controllers
{
    [Route("odata")]
    [ApiController]
    [EnableQuery]

    public class EventsODataController(ILogger<EventsODataController> logger,
        IMediator mediator
    ) : ODataController
    {
        private readonly ILogger<EventsODataController> _logger = logger;
        private readonly IMediator _mediator = mediator;

        public static IEdmModel GetEdmModel()
        {
            ODataConventionModelBuilder builder = new();
            builder.EnableLowerCamelCase();
            builder.EntitySet<Event>("events");
            return builder.GetEdmModel();
        }

        [HttpGet("events")]
        public async Task<IQueryable<Event>> GetAllEvents(CancellationToken cancellationToken)
        {

            var response = await _mediator.SendQueryAsync<EventGetAllQuery, IQueryable<Event>>(new EventGetAllQuery(), cancellationToken);
            return response;
        }


    }
}