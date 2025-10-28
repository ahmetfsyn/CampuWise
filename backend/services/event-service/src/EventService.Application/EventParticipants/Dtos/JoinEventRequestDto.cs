namespace EventService.Application.EventParticipants.Dtos
{
    public record JoinEventRequestDto(
        Guid? UserId
    );
}