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
    public class CamperRepository : BaseRepository, ICamperRepository
    {
        public CamperRepository(CampContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Camper>> GetCampers(int portalId) =>
            await Context.Campers.Where(x => x.PortalId == portalId && !x.IsDeleted).ToListAsync();

        public async Task<IEnumerable<Camper>> GetCampersByGroup(int portalId, int groupId) =>
            await Context.Campers.Where(x => x.PortalId == portalId && !x.IsDeleted && x.GroupId == groupId)
                .ToListAsync();

        public async Task<IEnumerable<Camper>> GetCampersForRegistration(int portalId, int? currentCamperId)
        {
            Camper currentCamper = null;

            if (currentCamperId != null)
            {
                currentCamper = await Context.Campers
                    .Where(x => x.PortalId == portalId && x.Id == currentCamperId.Value).FirstOrDefaultAsync();

                if (currentCamper == null)
                {
                    throw new Exception("The current camper doesn't exist.");
                }
            }

            List<Camper> campers = await Context.Campers
                .Where(x => x.PortalId == portalId && x.IsActive && !x.IsDeleted).ToListAsync();

            if (currentCamper == null)
            {
                return campers;
            }

            bool alreadyExists = campers.Any(x => x.Id == currentCamper.Id);

            return alreadyExists ? campers : new[] {currentCamper}.Concat(campers);
        }

        public async Task<IEnumerable<Camper>> GetCampersByIds(int portalId, IEnumerable<int> camperIds)
        {
            int[] camperIdsArray = camperIds as int[] ?? camperIds.ToArray();

            if (!camperIdsArray.Any())
            {
                throw new Exception("No camper IDs detected.");
            }

            return await Context.Campers.Where(c => c.PortalId == portalId && camperIdsArray.Contains(c.Id))
                .ToListAsync();
        }

        public async Task<Camper> GetCamperById(int portalId, int camperId)
        {
            Camper dbCamper =
                await Context.Campers.FirstOrDefaultAsync(x =>
                    x.PortalId == portalId && x.Id == camperId && !x.IsDeleted);

            if (dbCamper == null)
            {
                throw new Exception("This camper does not exist.");
            }

            return dbCamper;
        }

        public async Task<Camper> CreateCamper(int portalId, CamperModel camper)
        {
            if (camper.IsMinor && (string.IsNullOrEmpty(camper.ParentFirstName) ||
                                   string.IsNullOrEmpty(camper.ParentLastName)))
            {
                throw new Exception("This parent's information is required for this minor camper.");
            }

            Camper newCamper = new Camper
            {
                PortalId = portalId,
                FirstName = camper.FirstName.Trim(),
                LastName = camper.LastName.Trim(),
                BirthDate = camper.BirthDate != null
                    ? new DateTimeOffset(new DateTime(camper.BirthDate.Value.Year, camper.BirthDate.Value.Month,
                        camper.BirthDate.Value.Day, 0, 0, 0))
                    : (DateTimeOffset?) null,
                ParentFirstName = camper.ParentFirstName?.Trim(),
                ParentLastName = camper.ParentLastName?.Trim(),
                Allergies = camper.Allergies?.Trim(),
                Medicine = camper.Medicine?.Trim(),
                StartingBalance = camper.StartingBalance,
                CreatedBy = camper.CreatedBy,
                CreatedDate = DateTimeOffset.Now,
                UpdatedDate = DateTimeOffset.Now,
                IsActive = true,
                IsDeleted = false,
                LoginUser = camper.LoginUser,
                CabinId = camper.CabinId,
                CounselorId = camper.CounselorId,
                GroupId = camper.GroupId
            };

            await Context.Campers.AddAsync(newCamper);
            await Context.SaveChangesAsync();

            return newCamper;
        }

        public async Task DeleteCamper(int portalId, int camperId)
        {
            Camper dbCamper = await GetCamperById(portalId, camperId);

            dbCamper.IsActive = false;
            dbCamper.IsDeleted = true;

            await Context.SaveChangesAsync();
        }

        public async Task<Camper> UpdateCamper(int portalId, int camperId, CamperModel camper)
        {
            if (camper.IsMinor && (string.IsNullOrEmpty(camper.ParentFirstName) ||
                                   string.IsNullOrEmpty(camper.ParentLastName)))
            {
                throw new Exception("This parent's information is required for this minor camper.");
            }

            Camper dbCamper = await GetCamperById(portalId, camperId);

            dbCamper.FirstName = camper.FirstName.Trim();
            dbCamper.LastName = camper.LastName.Trim();
            dbCamper.BirthDate = camper.BirthDate != null
                ? new DateTimeOffset(new DateTime(camper.BirthDate.Value.Year, camper.BirthDate.Value.Month,
                    camper.BirthDate.Value.Day, 0, 0, 0))
                : (DateTimeOffset?) null;
            dbCamper.ParentFirstName = camper.ParentFirstName?.Trim();
            dbCamper.ParentLastName = camper.ParentLastName?.Trim();
            dbCamper.Allergies = camper.Allergies?.Trim();
            dbCamper.Medicine = camper.Medicine?.Trim();
            dbCamper.StartingBalance = camper.StartingBalance;
            dbCamper.IsActive = camper.IsActive;
            dbCamper.UpdatedDate = DateTimeOffset.Now;
            dbCamper.CabinId = camper.CabinId;
            dbCamper.LoginUser = camper.LoginUser;
            dbCamper.CounselorId = camper.CounselorId;
            dbCamper.GroupId = camper.GroupId;

            await Context.SaveChangesAsync();

            return dbCamper;
        }

        public async Task UpdateGroups(int portalId, int[] camperIds, int groupId)
        {
            List<Camper> campers =
                await Context.Campers.Where(x => x.PortalId == portalId && camperIds.Contains(x.Id) && !x.IsDeleted)
                    .ToListAsync();

            campers.ForEach(x => x.GroupId = groupId);

            await Context.SaveChangesAsync();
        }

        public async Task RemoveGroups(int portalId, int groupId)
        {
            List<Camper> campers = await Context.Campers.Where(x => x.PortalId == portalId && x.GroupId == groupId)
                .ToListAsync();

            campers.ForEach(x => x.GroupId = null);

            await Context.SaveChangesAsync();
        }
    }
}