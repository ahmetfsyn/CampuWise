
using UserService.Application;
using UserService.Infrastructure;

namespace UserService.WebApi.Installers
{
    public static class InternalServiceInstaller
    {
        public static IServiceCollection AddInternalServices(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddApplicationServices(configuration);
            services.AddInfrastructureServices(configuration);
            services.AddCors();
            services.AddExceptionHandler<ExceptionHandler>().AddProblemDetails();
            return services;
        }
    }
}