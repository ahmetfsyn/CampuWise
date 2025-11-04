using Cortex.Mediator.Commands;
using TS.Result;

namespace EventService.Application.Events.commands;

public record CreateEventCommand(
    string Title,
    string Description,
    string Category,
    string Place,
    Guid? OrganizerId,
    DateTimeOffset? StartDate,
    List<string>? Tags = default,
    string? ImageUrl = default
    ) : ICommand<Result<Guid>>;
