using System.Collections.Generic;
using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface IGroupRepository
    {
        Task<IEnumerable<Group>> GetGroups(int portalId);
        Task<Group> GetGroupById(int portalId, int groupId);
        Task<IEnumerable<Group>> GetGroupsByName(int portalId, string name);
        Task<Group> CreateGroup(int portalId, GroupModel group);
        Task DeleteGroup(int portalId, int groupId);
        Task<Group> UpdateGroup(int portalId, int groupId, GroupModel group);
    }
}