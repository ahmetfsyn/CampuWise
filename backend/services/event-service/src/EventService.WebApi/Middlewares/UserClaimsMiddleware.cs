// namespace EventService.WebApi.Middlewares
// {
//     public class UserClaimsMiddleware(RequestDelegate next)
//     {
//         private readonly RequestDelegate _next = next;

//         public async Task InvokeAsync(HttpContext context)
//         {

//             if (context.Request.Path.StartsWithSegments("/scalar") || context.Request.Path.StartsWithSegments("/openapi"))
//             {
//                 await _next(context);
//                 return;
//             }

//             if (!(context.User.Identity?.IsAuthenticated ?? false))
//                 throw new UnauthorizedAccessException("User is not authenticated.");

//             var userIdClaim = context.User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
//             if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
//                 throw new UnauthorizedAccessException("User ID claim is missing or invalid.");

//             context.Items["userId"] = userId;

//             await _next(context);
//         }
//     }
// }