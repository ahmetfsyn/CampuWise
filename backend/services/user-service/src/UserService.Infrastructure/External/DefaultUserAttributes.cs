namespace UserService.Infrastructure.External
{
    public class DefaultUserAttributes(string avatarUrl, string phoneNumber)
    {
        public string? AvatarUrl { get; init; } = avatarUrl;
        public string PhoneNumber { get; init; } = phoneNumber;
    }
}