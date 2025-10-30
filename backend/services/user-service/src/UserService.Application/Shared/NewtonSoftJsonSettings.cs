
using Newtonsoft.Json;

namespace UserService.Infrastructure.Utilities
{
    public static class NewtonSoftJsonSettings
    {
        public static readonly JsonSerializerSettings CamelCase = new()
        {
            ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver(),
            NullValueHandling = NullValueHandling.Ignore
        };
    }
}