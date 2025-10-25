# 1. Base image
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# 2. Copy csproj ve restore
COPY ["src/UserService.WebApi/UserService.WebApi.csproj", "UserService.WebApi/"]
COPY ["src/UserService.Application/UserService.Application.csproj", "UserService.Application/"]
COPY ["src/UserService.Infrastructure/UserService.Infrastructure.csproj", "UserService.Infrastructure/"]

RUN dotnet restore "UserService.WebApi/UserService.WebApi.csproj"

# 3. Tüm source’u kopyala ve build
COPY src/. .
WORKDIR "/src/UserService.WebApi"
RUN dotnet publish -c Release -o /app/publish

# 4. Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 5000
ENTRYPOINT ["dotnet", "UserService.WebApi.dll"]