using Cortex.Mediator.Exceptions;
using EventService.Domain.Common;
using Flurl.Http;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using TS.Result;

namespace EventService.WebApi;

public sealed class ExceptionHandler(ILogger<ExceptionHandler> logger) : IExceptionHandler
{
    private readonly ILogger<ExceptionHandler> _logger = logger;

    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        httpContext.Response.ContentType = "application/json";
        Result<string> errorResult;

        switch (exception)
        {
            case ValidationException validationEx:
                _logger.LogWarning(validationEx, "Validation failed");
                await HandleValidationExceptionAsync(httpContext, validationEx);
                return true;

            case FlurlHttpException flurlEx:
                _logger.LogError(flurlEx, "External service call failed");
                await HandleFlurlHttpExceptionAsync(httpContext, flurlEx);
                return true;

            case DbUpdateException dbEx:
                _logger.LogError(dbEx, "Database update failed");
                await HandleDbUpdateExceptionAsync(httpContext, dbEx);
                return true;

            case DomainException domainEx:
                _logger.LogWarning(domainEx, "Domain exception");
                httpContext.Response.StatusCode = domainEx.StatusCode;
                errorResult = Result<string>.Failure([domainEx.Message]);
                errorResult.StatusCode = httpContext.Response.StatusCode;
                await httpContext.Response.WriteAsJsonAsync(errorResult, cancellationToken: cancellationToken);
                return true;

            case UnauthorizedAccessException uaEx:
                _logger.LogWarning(uaEx, "Unauthorized access");
                errorResult = Result<string>.Failure(StatusCodes.Status401Unauthorized, [uaEx.Message]);
                httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await httpContext.Response.WriteAsJsonAsync(errorResult, cancellationToken: cancellationToken);
                return true;

            default:
                _logger.LogError(exception, "Unhandled exception");
                errorResult = Result<string>.Failure(exception.Message);
                httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
                await httpContext.Response.WriteAsJsonAsync(errorResult, cancellationToken: cancellationToken);
                return true;
        }
    }
    private static async Task HandleValidationExceptionAsync(HttpContext httpContext, ValidationException ex)
    {
        httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;

        var errorMessages = ex.Errors
            .SelectMany(kv => kv.Value.Select(v => $"{v}"))
            .ToList();

        var errorResult = Result<string>.Failure(
            StatusCodes.Status400BadRequest,
            errorMessages
        );

        await httpContext.Response.WriteAsJsonAsync(errorResult);
    }

    private static async Task HandleFlurlHttpExceptionAsync(HttpContext httpContext, FlurlHttpException ex)
    {
        httpContext.Response.StatusCode = ex.StatusCode ?? StatusCodes.Status500InternalServerError;

        string responseBody = string.Empty;
        try
        {
            responseBody = await ex.GetResponseStringAsync();

            if (!string.IsNullOrEmpty(responseBody))
            {
                var innerDict = JsonConvert.DeserializeObject<Dictionary<string, string>>(responseBody);
                if (innerDict != null && (innerDict.TryGetValue("errorMessage", out var errorMessage) || innerDict.TryGetValue("error_description", out errorMessage)))
                {
                    responseBody = errorMessage; // artık temiz mesaj
                }
            }
        }
        catch
        {
            // response yoksa boş bırak
        }

        var errorResult = Result<string>.Failure(httpContext.Response.StatusCode, responseBody);
        await httpContext.Response.WriteAsJsonAsync(errorResult);
    }

    private static async Task HandleDbUpdateExceptionAsync(HttpContext httpContext, DbUpdateException ex)
    {
        httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;

        string userFriendlyMessage = "Database update failed.";

        // Eğer PostgreSQL unique constraint hatasıysa
        if (ex.InnerException is Npgsql.PostgresException pgEx)
        {
            if (pgEx.SqlState == "23505") // Unique violation
            {
                userFriendlyMessage = "This record already exists. Please check your input.";
            }
            else if (pgEx.SqlState == "23503") // Foreign key violation
            {
                userFriendlyMessage = "Related entity does not exist. Please check your references.";
            }
            else
            {
                userFriendlyMessage = pgEx.Message; // Diğer hatalar için teknik mesaj
            }
        }

        var errorResult = Result<string>.Failure(StatusCodes.Status400BadRequest, [userFriendlyMessage]);

        await httpContext.Response.WriteAsJsonAsync(errorResult);
    }

}