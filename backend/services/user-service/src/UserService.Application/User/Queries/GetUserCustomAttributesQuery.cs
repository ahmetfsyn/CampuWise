using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using UserService.Application.Interfaces;

namespace UserService.Application.User.Queries
{
    // public record GetUserCustomAttributesQuery(string KeycloakId) : IRequest<UserCustomAttributesDto>;


    // public class GetUserCustomAttributesQueryHandler : IRequestHandler<GetUserCustomAttributesQuery, UserCustomAttributesDto>
    // {
    //     private readonly IKeycloakService _keycloakService;
    //     public GetUserCustomAttributesQueryHandler(IKeycloakService keycloakService) => _keycloakService = keycloakService;

    //     public async Task<UserCustomAttributesDto> Handle(GetUserCustomAttributesQuery request, CancellationToken cancellationToken)
    //         => await _keycloakService.GetCustomAttributesAsync(request.KeycloakId);
    // }
}