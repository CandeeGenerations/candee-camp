using System;
using CandeeCamp.Core.Domain.DomainObjects;

namespace CandeeCamp.Core.Repository.Contracts
{
    public interface IRolesRepository
    {
        Role GetRole(Guid roleId);
    }
}