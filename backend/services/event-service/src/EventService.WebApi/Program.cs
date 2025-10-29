using EventService.WebApi.Installers;
using EventService.WebApi.Modules;
using Scalar.AspNetCore;
using Serilog;


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

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddInternalServices(builder.Configuration);
builder.Services.AddExternalServices();

var app = builder.Build();
var scalarOptions = builder.Configuration.GetSection("Scalar").Get<ScalarOptions>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.MapScalarApiReference(c =>
    {
        c.Theme = scalarOptions?.Theme;
    });

}

// Ortak middlewares
app.AddMiddlewares();

// Map endpoints
app.MapControllers()
   .RequireRateLimiting("fixed");

// Register custom feature routes
app.RegisterRoutes();

app.Run();