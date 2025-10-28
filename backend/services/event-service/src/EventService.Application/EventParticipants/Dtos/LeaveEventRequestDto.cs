namespace EventService.Application.EventParticipants.Dtos
{
    public record LeaveEventRequestDto(
        Guid? UserId
    );
}