using EventService.Application;
using EventService.Application.EventParticipants;
using EventService.Application.Events;
using EventService.Infrastructure.Persistence;
using EventService.Infrastructure.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EventService.Infrastructure;

public static class InfrastructureRegistrar
{

    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<EventDbContext>(options => options.UseNpgsql(configuration.GetConnectionString("EventDb")).UseSnakeCaseNamingConvention());

        services.AddScoped<IEventRepository, EventRepository>();
        services.AddScoped<IEventParticipantRepository, EventParticipantRepository>();

        services.AddScoped<IUnitOfWork, UnitOfWork>();

        return services;

    }
}
