namespace UserService.Infrastructure.External
{
    public class NewUserDto(string firstName, string lastName, string username, string email, DefaultUserAttributes attributes, bool enabled, bool emailVerified, object[] credentials)
    {
        public string FirstName { get; set; } = firstName;
        public string LastName { get; set; } = lastName;
        public string Username { get; set; } = username;
        public string Email { get; set; } = email;
        public DefaultUserAttributes Attributes { get; set; } = attributes;
        public bool Enabled { get; set; } = enabled;
        public bool EmailVerified { get; set; } = emailVerified;
        public object[] Credentials { get; set; } = credentials;
    }
}