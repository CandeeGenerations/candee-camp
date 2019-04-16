using System.Collections.Generic;
using CandeeCampApi.Common;

namespace CandeeCampApi.DomainObjects
{
    public class Role : GuidId
    {
        public Role()
        {
            UserRoles = new List<UserRole>();
        }

        public string Name { get; set; }
        public virtual IList<UserRole> UserRoles { get; set; }
    }
}