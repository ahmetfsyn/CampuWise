using System.Threading.RateLimiting;
using EventService.WebApi.Controllers;
using Microsoft.AspNetCore.OData;
using Microsoft.AspNetCore.RateLimiting;

namespace EventService.WebApi.Installers
{
    public static class ExternalServiceInstaller
    {
        public static IServiceCollection AddExternalServices(this IServiceCollection services)
        {

            services.AddOpenApi();
            services
                .AddControllers()
                .AddOData(opt =>
                {

                    opt.EnableQueryFeatures();
                    opt.AddRouteComponents("odata", EventsODataController.GetEdmModel());

                })
                .AddNewtonsoftJson(options =>
                {
                    // JSON serializer loop’u da engelle
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });
            services.AddEndpointsApiExplorer();

            services.AddRateLimiter(x =>
                x.AddFixedWindowLimiter("fixed", cfg =>
                {
                    cfg.QueueLimit = 100;
                    cfg.Window = TimeSpan.FromSeconds(1);
                    cfg.PermitLimit = 100;
                    cfg.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
                })
            );

            services.AddAuthentication("Bearer")
            .AddJwtBearer("Bearer", options =>
            {
                options.Authority = "http://keycloak-campuwise:8080/realms/campuwise";
                options.Audience = "account";
                options.RequireHttpsMetadata = false;

            });

            services.AddAuthorization();

            services.AddResponseCompression(opt =>
            {
                opt.EnableForHttps = true;
            });
            return services;
        }
    }
}