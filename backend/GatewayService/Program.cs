using Yarp.ReverseProxy;

var builder = WebApplication.CreateBuilder(args);

// Controller’ları ekle (OData veya diğer controller’lar için)
builder.Services.AddControllers();

// Swagger/OpenAPI
builder.Services.AddOpenApi();

// YARP Reverse Proxy’i ekle ve config’i appsettings.json’dan al
builder.Services.AddReverseProxy()
       .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

var app = builder.Build();

// Swagger/OpenAPI middleware
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// HTTPS yönlendirme
app.UseHttpsRedirection();

// Authorization (opsiyonel, JWT veya auth ekleyeceksen)
app.UseAuthorization();

// Controller’ları map et (OData için gerekli)
app.MapControllers();

// YARP proxy’yi map et
app.MapReverseProxy();

app.Run();