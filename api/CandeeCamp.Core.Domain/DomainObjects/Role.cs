using System.Collections.Generic;
using CandeeCamp.Core.Domain.Common;

namespace CandeeCamp.Core.Domain.DomainObjects
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