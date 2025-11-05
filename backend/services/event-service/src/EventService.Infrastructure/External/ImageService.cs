using System.Net.Http.Headers;
using EventService.Application.Interfaces;
using Flurl.Http;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;

namespace EventService.Infrastructure.External
{
    public class ImageService(IConfiguration configuration) : IImageService
    {
        private readonly string _imageKitUploadUrl = configuration["ImageKit:UploadEndpoint"]!;
        private readonly string _privateKey = configuration["ImageKit:PrivateKey"]!;

        public async Task<string> UploadImageAsync(byte[] imageBytes, string fileName, CancellationToken cancellationToken = default)
        {
            using var content = new MultipartFormDataContent();
            var byteContent = new ByteArrayContent(imageBytes);
            byteContent.Headers.ContentType = MediaTypeHeaderValue.Parse("application/octet-stream");
            content.Add(byteContent, "file", fileName);
            content.Add(new StringContent(fileName), "fileName");
            content.Add(new StringContent("/CampuWise/events"), "folder");


            var response = await _imageKitUploadUrl
                .WithBasicAuth(_privateKey, string.Empty)
                .PostAsync(content, cancellationToken: cancellationToken);

            var json = await response.GetStringAsync();
            var parsed = JObject.Parse(json);
            return parsed["url"]?.ToString() ?? throw new Exception("Image upload failed — no URL returned.");
        }
    }
}