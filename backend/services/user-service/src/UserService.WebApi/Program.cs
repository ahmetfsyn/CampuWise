using Scalar.AspNetCore;
using Serilog;
using UserService.WebApi.Configs;
using UserService.WebApi.Installers;
using UserService.WebApi.Modules;

var builder = WebApplication.CreateBuilder(args);
Log.Logger = new LoggerConfiguration()
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.File("logs/log-.txt", rollingInterval: RollingInterval.Day)
    // .WriteTo.Elasticsearch(new Serilog.Sinks.Elasticsearch.ElasticsearchSinkOptions(new Uri("http://localhost:9200"))
    // {
    //     AutoRegisterTemplate = true
    // })
    .CreateLogger();

// Host’a Serilog bağla
builder.Host.UseSerilog();

builder.Services.AddInternalServices(builder.Configuration);
builder.Services.AddExternalServices();

RegisterMapsterConfig.RegisterMappings();

var app = builder.Build();
var scalarOptions = builder.Configuration.GetSection("Scalar").Get<ScalarOptions>();


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.MapScalarApiReference(c =>
       {
           c.Theme = scalarOptions?.Theme;
       });
}


// app.UseHttpsRedirection();

app.AddMiddlewares();

app.MapControllers().RequireRateLimiting("fixed");

app.RegisterRoutes();

app.Run();
