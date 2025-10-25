using Scalar.AspNetCore;
using UserService.WebApi.Installers;
using UserService.WebApi.Modules;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddInternalServices(builder.Configuration);

builder.Services.AddExternalServices();

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapScalarApiReference();

// app.UseHttpsRedirection();

app.AddMiddlewares();

app.MapControllers().RequireRateLimiting("fixed").RequireAuthorization();

app.RegisterRoutes();

app.Run();
