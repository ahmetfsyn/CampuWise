using Cortex.Mediator.Queries;
using EventService.Application.Events.Dtos;
using EventService.Domain.Events;
using TS.Result;

namespace EventService.Application.Events.Queries
{
    public record GetEventByIdQuery(
        Guid Id
    ) : IQuery<Result<GetEventByIdResponseDto>>;
}