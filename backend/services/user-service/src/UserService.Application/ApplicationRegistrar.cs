using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using UserService.Application.Behaviors;

namespace UserService.Application;

public static class ApplicationRegistrar
{

    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddMediatR(conf =>
               {
                   conf.RegisterServicesFromAssembly(typeof(ApplicationRegistrar).Assembly);
                   conf.AddOpenBehavior(typeof(ValidationBehavior<,>));
               });

        services.AddValidatorsFromAssembly(typeof(ApplicationRegistrar).Assembly);

        return services;
    }
}
