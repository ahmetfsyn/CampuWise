using Cortex.Mediator.Exceptions;
using Flurl.Http;
using Microsoft.AspNetCore.Diagnostics;
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

            default:
                _logger.LogError(exception, "Unhandled exception");
                errorResult = Result<string>.Failure(exception.Message);
                httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
                await httpContext.Response.WriteAsJsonAsync(errorResult, cancellationToken: cancellationToken);
                return true;
        }
    }

    private static async Task HandleValidationExceptionAsync(HttpContext httpContext, Cortex.Mediator.Exceptions.ValidationException ex)
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
}