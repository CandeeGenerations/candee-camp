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
    public class CamperRepository : BaseRepository, ICamperRepository
    {
        public CamperRepository(CampContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Camper>> GetCampers() =>
            await Context.Campers.Where(x => !x.IsDeleted).ToListAsync();

        public async Task<Camper> GetCamperById(int camperId)
        {
            Camper dbCamper = await Context.Campers.FirstOrDefaultAsync(x => x.Id == camperId && !x.IsDeleted);

            if (dbCamper == null)
            {
                throw new Exception("This camper does not exist.");
            }

            return dbCamper;
        }

        public async Task<Camper> CreateCamper(CamperModel camper)
        {
            if (camper.IsMinor && (string.IsNullOrEmpty(camper.ParentFirstName) ||
                                   string.IsNullOrEmpty(camper.ParentLastName)))
            {
                throw new Exception("This parent's information is required for this minor camper.");
            }

            Camper newCamper = new Camper
            {
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

        public async Task DeleteCamper(int camperId)
        {
            Camper dbCamper = await GetCamperById(camperId);

            dbCamper.IsActive = false;
            dbCamper.IsDeleted = true;

            await Context.SaveChangesAsync();
        }

        public async Task<Camper> UpdateCamper(int camperId, CamperModel camper)
        {
            Camper dbCamper = await GetCamperById(camperId);

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
            dbCamper.IsActive = camper.IsActive;
            dbCamper.UpdatedDate = DateTimeOffset.Now;
            dbCamper.CabinId = camper.CabinId;
            dbCamper.LoginUser = camper.LoginUser;
            dbCamper.CounselorId = camper.CounselorId;
            dbCamper.GroupId = camper.GroupId;

            await Context.SaveChangesAsync();

            return dbCamper;
        }
    }
} 