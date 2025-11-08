using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using UserService.Application.Interfaces;
using UserService.Infrastructure.External;

namespace UserService.Infrastructure;

public static class InfrastructureRegistrar
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {

		services.AddScoped<IKeycloakAuthService, KeycloakAuthService>();
        services.AddScoped<IKeycloakUserService, KeycloakUserService>();

        return services;
    }
}
