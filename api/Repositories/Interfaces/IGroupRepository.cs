using System.Collections.Generic;
using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface IGroupRepository
    {
        Task<IEnumerable<Group>> GetGroups();
        Task<Group> GetGroupById(int groupId);
        Task<IEnumerable<Group>> GetGroupsByName(string name);
        Task<Group> CreateGroup(GroupModel group);
        Task DeleteGroup(int groupId);
        Task<Group> UpdateGroup(int groupId, GroupModel group);
    }
} 