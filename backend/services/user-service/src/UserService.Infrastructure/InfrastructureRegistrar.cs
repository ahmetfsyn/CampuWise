using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using UserService.Application.Interfaces;

namespace UserService.Infrastructure;

public static class InfrastructureRegistrar
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddHttpClient<IKeycloakService, KeycloakService>();
        return services;
    }
}
