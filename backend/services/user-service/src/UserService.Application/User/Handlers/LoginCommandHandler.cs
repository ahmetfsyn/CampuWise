using Cortex.Mediator.Commands;
using TS.Result;
using UserService.Application.Interfaces;
using UserService.Application.User.Commands;
using UserService.Application.User.DTOs;

namespace UserService.Application.User.Handlers
{
    public class LoginCommandHandler(IKeycloakService keycloakService) : ICommandHandler<LoginCommand, Result<LoginResponseDto>>
    {
        private readonly IKeycloakService _keycloakService = keycloakService;

        public async Task<Result<LoginResponseDto>> Handle(LoginCommand request, CancellationToken cancellationToken)
        {

            var token = await _keycloakService.LoginAsync(request.Email, request.Password);

            return token is not null ? Result<LoginResponseDto>.Succeed(token) : Result<LoginResponseDto>.Failure("Login failed");
        }
    }
}