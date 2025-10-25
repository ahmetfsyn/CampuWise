using System.Threading.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;

namespace UserService.WebApi.Installers
{
    public static class ExternalServiceInstaller
    {
        public static IServiceCollection AddExternalServices(this IServiceCollection services)
        {
            services.AddOpenApi();
            services.AddControllers();
            services.AddRateLimiter(x =>
                x.AddFixedWindowLimiter("fixed", cfg =>
                {
                    cfg.QueueLimit = 100;
                    cfg.Window = TimeSpan.FromSeconds(1);
                    cfg.PermitLimit = 100;
                    cfg.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
                })
            );
            services.AddAuthorization();
            services.AddResponseCompression(opt =>
            {
                opt.EnableForHttps = true;
            });
            return services;
        }
    }
}