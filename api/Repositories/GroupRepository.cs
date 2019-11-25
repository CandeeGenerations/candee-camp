using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CandeeCamp.API.Context;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Models;
using CandeeCamp.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CandeeCamp.API.Repositories
{
    public class GroupRepository : BaseRepository, IGroupRepository
    {
        public GroupRepository(CampContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Group>> GetGroups() =>
            await Context.Groups.Where(x => !x.IsDeleted).ToListAsync();

        public async Task<Group> GetGroupById(int groupId)
        {
            Group dbGroup = await Context.Groups.FirstOrDefaultAsync(x => x.Id == groupId && !x.IsDeleted);

            if (dbGroup == null)
            {
                throw new Exception("This group does not exist.");
            }

            return dbGroup;
        }

        public async Task<Group> CreateGroup(GroupModel group)
        {
            Group newGroup = new Group
            {
                IsDeleted = false,
                CreatedDate = DateTimeOffset.Now,
                UpdatedDate = DateTimeOffset.Now,
                Name = group.Name.Trim(),
                IsActive = true,
                LoginUser = group.LoginUser,
                CreatedBy = group.CreatedBy
            };

            await Context.Groups.AddAsync(newGroup);
            await Context.SaveChangesAsync();

            return newGroup;
        }

        public async Task DeleteGroup(int groupId)
        {
            Group dbGroup = await GetGroupById(groupId);

            dbGroup.IsActive = false;
            dbGroup.IsDeleted = true;

            await Context.SaveChangesAsync();
        }

        public async Task<Group> UpdateGroup(int groupId, GroupModel group)
        {
            Group dbGroup = await GetGroupById(groupId);

            dbGroup.Name = group.Name.Trim();
            dbGroup.LoginUser = group.LoginUser;
            dbGroup.IsActive = group.IsActive;
            dbGroup.UpdatedDate = DateTimeOffset.Now;
            
            await Context.SaveChangesAsync();

            return dbGroup;
        }
    }
} 