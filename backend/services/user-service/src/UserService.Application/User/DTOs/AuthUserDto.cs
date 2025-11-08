namespace UserService.Application.User.DTOs
{
	public record AuthUserDto
	{
		public Guid Id { get; set; } = Guid.Empty;
		public string? Email { get; set; }
		public string? FirstName { get; set; }
		public string? LastName { get; set; }
		public string? FullName => $"{FirstName} {LastName}".Trim();
		public string? AvatarUrl { get; set; }
	}
}
