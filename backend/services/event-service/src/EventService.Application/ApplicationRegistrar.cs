using Cortex.Mediator.DependencyInjection;
using EventService.Application.Behaviors;
using FluentValidation;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EventService.Application;

public static class ApplicationRegistrar
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {

        services.AddValidatorsFromAssembly(typeof(ApplicationRegistrar).Assembly);

        services.AddCortexMediator(
            configuration,
            [typeof(ApplicationRegistrar)],
            options =>
            {
                options.AddOpenCommandPipelineBehavior(typeof(ValidationBehavior<,>));
                options.AddDefaultBehaviors();
            }
        );

        return services;
    }
}