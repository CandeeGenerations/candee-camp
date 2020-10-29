using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Reclaimed.API.Context;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;
using Reclaimed.API.Repositories.Interfaces;

namespace Reclaimed.API.Repositories
{
    public class GroupRepository : BaseRepository, IGroupRepository
    {
        private readonly ICamperRepository _camperRepository;

        public GroupRepository(CampContext context, ICamperRepository camperRepository) : base(context)
        {
            _camperRepository = camperRepository;
        }

        public async Task<IEnumerable<Group>> GetGroups(int portalId, ActiveFilterModel filters = null)
        {
            IQueryable<Group> groups = Context.Groups.Where(x => x.PortalId == portalId && !x.IsDeleted);

            if (filters == null) return await groups.ToListAsync();
            {
                if (!string.IsNullOrEmpty(filters.Name))
                {
                    groups = groups.Where(x => x.Name.ToLower().Contains(filters.Name.Trim().ToLower()));
                }

                if (filters.IsActive != null)
                {
                    groups = groups.Where(x => x.IsActive == filters.IsActive.Value);
                }
            }

            return await groups.ToListAsync();
        }

        public async Task<Group> GetGroupById(int portalId, int groupId)
        {
            Group dbGroup =
                await Context.Groups.FirstOrDefaultAsync(x =>
                    x.PortalId == portalId && x.Id == groupId && !x.IsDeleted);

            if (dbGroup == null)
            {
                throw new Exception("This group does not exist.");
            }

            return dbGroup;
        }

        public async Task<IEnumerable<Group>> GetGroupsByName(int portalId, string name) => await Context.Groups
            .Where(x => x.PortalId == portalId && !x.IsDeleted &&
                        string.Equals(x.Name, name.Trim(), StringComparison.CurrentCultureIgnoreCase))
            .ToListAsync();

        public async Task<Group> CreateGroup(int portalId, GroupModel group)
        {
            IEnumerable<Group> existingGroups = await GetGroupsByName(portalId, group.Name);

            if (existingGroups.Any())
            {
                throw new Exception("This group already exists. Please use another name.");
            }

            Group newGroup = new Group
            {
                PortalId = portalId,
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

            if (group.Campers != null && group.Campers.Any())
            {
                await _camperRepository.UpdateGroups(portalId, group.Campers, newGroup.Id);
            }

            return newGroup;
        }

        public async Task DeleteGroup(int portalId, int groupId)
        {
            Group dbGroup = await GetGroupById(portalId, groupId);

            dbGroup.IsActive = false;
            dbGroup.IsDeleted = true;

            await Context.SaveChangesAsync();

            await _camperRepository.RemoveGroups(portalId, groupId);
        }

        public async Task<Group> UpdateGroup(int portalId, int groupId, GroupModel group)
        {
            Group dbGroup = await GetGroupById(portalId, groupId);

            if (!string.Equals(dbGroup.Name, group.Name.Trim(), StringComparison.CurrentCultureIgnoreCase))
            {
                IEnumerable<Group> existingGroups = await GetGroupsByName(portalId, group.Name);

                if (existingGroups.Any())
                {
                    throw new Exception("This group already exists. Please use another name.");
                }
            }

            dbGroup.Name = group.Name.Trim();
            dbGroup.LoginUser = group.LoginUser;
            dbGroup.IsActive = group.IsActive;
            dbGroup.UpdatedDate = DateTimeOffset.Now;

            await Context.SaveChangesAsync();

            await _camperRepository.RemoveGroups(portalId, groupId);
            await _camperRepository.UpdateGroups(portalId, group.Campers, groupId);

            return dbGroup;
        }
    }
}