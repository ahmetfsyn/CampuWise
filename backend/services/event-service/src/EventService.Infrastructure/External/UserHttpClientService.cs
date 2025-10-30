using EventService.Application.Interfaces;
using Flurl.Http;
using Microsoft.Extensions.Configuration;
using TS.Result;

namespace EventService.Infrastructure.External
{
    public class UserServiceHttpClient(IConfiguration configuration) : IUserServiceClient
    {

        private readonly IConfiguration _configuration = configuration;

        public async Task<List<ParticipantDetailsResponseDto>> GetParticipantDetailsAsync(List<Guid> userIds)
        {
            var baseUrl = _configuration["UserService:BaseUrl"];
            var response = await $"{baseUrl}/users/details".PostJsonAsync(new { Ids = userIds }).ReceiveJson<Result<List<ParticipantDetailsResponseDto>>>();

            if (response.IsSuccessful && response.Data != null)
                return response.Data;

            return [];
        }
    }
}