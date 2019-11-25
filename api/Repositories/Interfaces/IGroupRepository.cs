using System.Collections.Generic;
using System.Threading.Tasks;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Models;

namespace CandeeCamp.API.Repositories.Interfaces
{
    public interface IGroupRepository
    {
        Task<IEnumerable<Group>> GetGroups();
        Task<Group> GetGroupById(int groupId);
        Task<Group> CreateGroup(GroupModel group);
        Task DeleteGroup(int groupId);
        Task<Group> UpdateGroup(int groupId, GroupModel group);
    }
} 