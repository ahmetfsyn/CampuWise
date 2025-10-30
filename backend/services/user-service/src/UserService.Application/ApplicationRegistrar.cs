using Cortex.Mediator.DependencyInjection;
using FluentValidation;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using UserService.Application.Behaviors;
namespace UserService.Application;

public static class ApplicationRegistrar
{

    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {

        services.AddCortexMediator(
            configuration,
            [typeof(ApplicationRegistrar)],
            options =>
            {

                options.AddDefaultBehaviors();
                options.AddOpenCommandPipelineBehavior(typeof(ValidationBehavior<,>));
            }
            );

        services.AddValidatorsFromAssembly(typeof(ApplicationRegistrar).Assembly);

        return services;
    }
}
