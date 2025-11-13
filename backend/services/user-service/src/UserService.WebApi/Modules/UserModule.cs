using Cortex.Mediator;
using Mapster;
using TS.Result;
using UserService.Application.User.Commands;
using UserService.Application.User.DTOs;
using UserService.Application.User.Queries;
using UserService.WebApi.Extensions;

namespace UserService.WebApi.Modules
{
	public static class UserModule
	{
		public static void RegisterUserRoutes(this IEndpointRouteBuilder app)
		{
			RouteGroupBuilder group = app.MapGroup("/users").WithTags("User");

			group
				.MapPost(
					"details",
					async (
						IMediator mediator,
						UserDetailsRequestDto request,
						CancellationToken cancellationToken
					) =>
					{
						UserDetailsCommand command = request.Adapt<UserDetailsCommand>();
						var result = await mediator.SendCommandAsync<
							UserDetailsCommand,
							Result<List<UserDetailsResponseDto>>
						>(command, cancellationToken);

						return result;
					}
				)
				.Produces<Result<List<UserDetailsResponseDto>>>();

			group
				.MapPatch(
					"me",
					async (
						IMediator mediator,
						UserUpdateRequestDto request,
						HttpContext httpContext,
						CancellationToken cancellationToken
					) =>
					{
						// Kendi profilini güncelliyor
						Guid requesterUserId = httpContext.GetUserId();

						var command = request.Adapt<UpdateUserProfileCommand>();

						command = command with { Id = requesterUserId };

						var result = await mediator.SendCommandAsync<
							UpdateUserProfileCommand,
							Result<UserProfileResponseDto>
						>(command, cancellationToken);

						return result;
					}
				)
				.RequireAuthorization()
				.Produces<Result<UserProfileResponseDto>>();

			group
				.MapGet(
					"me",
					async (
						IMediator mediator,
						HttpContext httpContext,
						CancellationToken cancellationToken
					) =>
					{
						Guid userId = httpContext.GetUserId();

						var query = new GetUserProfileByIdQuery(
							userId,
							IncludePrivateAttributes: true
						);

						var result = await mediator.SendQueryAsync<
							GetUserProfileByIdQuery,
							Result<UserProfileResponseDto>
						>(query, cancellationToken);

						return result;
					}
				)
				.RequireAuthorization()
				.Produces<Result<UserProfileResponseDto>>();

			group
				.MapGet(
					"{id}",
					async (
						Guid id,
						IMediator mediator,
						HttpContext httpContext,
						CancellationToken cancellationToken
					) =>
					{
						Guid requesterUserId = httpContext.GetUserId();

						var query = new GetUserProfileByIdQuery(id);

						var result = await mediator.SendQueryAsync<
							GetUserProfileByIdQuery,
							Result<UserProfileResponseDto>
						>(query, cancellationToken);

						return result;
					}
				)
				.RequireAuthorization()
				.Produces<Result<UserProfileResponseDto>>();
		}
	}
}
