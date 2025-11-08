using System.Security.Claims;

namespace UserService.WebApi.Extensions
{
    public static class HttpContextExtensions
    {
        public static Guid GetUserId(this HttpContext context)
        {
            var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? throw new UnauthorizedAccessException("User not authenticated");

            return Guid.Parse(userIdClaim);
        }
    }
}