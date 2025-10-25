using FluentValidation;
using Flurl.Http;
using Microsoft.AspNetCore.Diagnostics;
using Newtonsoft.Json;
using TS.Result;

public sealed class ExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        httpContext.Response.ContentType = "application/json";

        Result<string> errorResult;

        switch (exception)
        {
            case ValidationException validationEx:
                await HandleValidationExceptionAsync(httpContext, validationEx);
                return true;

            case FlurlHttpException flurlEx:
                await HandleFlurlHttpExceptionAsync(httpContext, flurlEx);
                return true;

            default:
                errorResult = Result<string>.Failure(exception.Message);
                httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
                await httpContext.Response.WriteAsJsonAsync(errorResult);
                return true;
        }
    }

    private static async Task HandleValidationExceptionAsync(HttpContext httpContext, ValidationException ex)
    {
        httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;

        var errorResult = Result<string>.Failure(
            StatusCodes.Status400BadRequest,
            ex.Errors.Select(e => e.PropertyName).ToList()
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