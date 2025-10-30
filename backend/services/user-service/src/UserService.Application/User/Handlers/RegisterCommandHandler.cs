using Cortex.Mediator.Commands;
using TS.Result;
using UserService.Application.Interfaces;
using UserService.Application.User.Commands;
namespace UserService.Application.User.Handlers
{
    public class RegisterCommandHandler(IKeycloakService keycloakService) : ICommandHandler<RegisterCommand, Result<string>>
    {
        private readonly IKeycloakService _keycloakService = keycloakService;

        public async Task<Result<string>> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            await _keycloakService.RegisterAsync(
                request.FullName,
                request.Password,
                request.Email);

            return Result<string>.Succeed("User registered successfully");

        }
    }

}