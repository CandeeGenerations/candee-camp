using Reclaimed.API.DomainObjects.Common;

namespace Reclaimed.API.DomainObjects
{
    public class AuthClient : PrimaryId
    {
        public string ClientUri { get; set; }

        public string ClientSecret { get; set; }

        public string ClientName { get; set; }

        public bool IsActive { get; set; }
    }
}