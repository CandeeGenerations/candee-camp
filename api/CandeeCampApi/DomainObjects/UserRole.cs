using CandeeCampApi.Common;

namespace CandeeCampApi.DomainObjects
{
    public class UserRole : GuidId
    {
        public virtual User User { get; set; }
        public virtual Role Role { get; set; }
    }
}