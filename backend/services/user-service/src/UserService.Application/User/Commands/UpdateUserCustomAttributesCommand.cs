using System.Threading;
using System.Threading.Tasks;
using MediatR;
using UserService.Application.Interfaces;

namespace UserService.Application.User.Commands
{
    // public record UpdateUserCustomAttributesCommand(string KeycloakId, string? PhoneNumber, string? AvatarUrl) : IRequest<Unit>;

    // public class UpdateUserCustomAttributesCommandHandler : IRequestHandler<UpdateUserCustomAttributesCommand, Unit>
    // {
    //     private readonly IKeycloakService _keycloakService;
    //     public UpdateUserCustomAttributesCommandHandler(IKeycloakService keycloakService) => _keycloakService = keycloakService;

    //     public async Task<Unit> Handle(UpdateUserCustomAttributesCommand request, CancellationToken cancellationToken)
    //     {
    //         await _keycloakService.UpdateCustomAttributesAsync(request.KeycloakId,
    //             new UserCustomAttributesDto
    //             {
    //                 PhoneNumber = request.PhoneNumber,
    //                 AvatarUrl = request.AvatarUrl
    //             });

    //         return Unit.Value;
    //     }
    // }
}