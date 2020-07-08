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
    public class CabinRepository : BaseRepository, ICabinRepository
    {
        public CabinRepository(CampContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Cabin>> GetCabins(int portalId, ActiveFilterModel filters = null)
        {
            IQueryable<Cabin> cabins = Context.Cabins.Where(x => x.PortalId == portalId && !x.IsDeleted);

            if (filters == null) return await cabins.ToListAsync();
            {
                if (!string.IsNullOrEmpty(filters.Name))
                {
                    cabins = cabins.Where(x => x.Name.ToLower().Contains(filters.Name.Trim().ToLower()));
                }

                if (filters.IsActive != null)
                {
                    cabins = cabins.Where(x => x.IsActive == filters.IsActive);
                }
            }

            return await cabins.ToListAsync();
        }

        public async Task<Cabin> GetCabinById(int portalId, int cabinId)
        {
            Cabin dbCabin =
                await Context.Cabins.FirstOrDefaultAsync(x =>
                    x.PortalId == portalId && x.Id == cabinId && !x.IsDeleted);

            if (dbCabin == null)
            {
                throw new Exception("This cabin does not exist.");
            }

            return dbCabin;
        }

        public async Task<IEnumerable<Cabin>> GetCabinsByName(int portalId, string name) => await Context.Cabins
            .Where(x => x.PortalId == portalId && !x.IsDeleted &&
                        string.Equals(x.Name, name.Trim(), StringComparison.CurrentCultureIgnoreCase))
            .ToListAsync();

        public async Task<Cabin> CreateCabin(int portalId, CabinModel cabin)
        {
            IEnumerable<Cabin> existingCabins = await GetCabinsByName(portalId, cabin.Name);

            if (existingCabins.Any())
            {
                throw new Exception("This cabin already exists. Please use another name.");
            }

            Cabin newCabin = new Cabin
            {
                PortalId = portalId,
                Name = cabin.Name.Trim(),
                CreatedBy = cabin.CreatedBy,
                CreatedDate = DateTimeOffset.Now,
                IsActive = true,
                IsDeleted = false,
                UpdatedDate = DateTimeOffset.Now
            };

            await Context.Cabins.AddAsync(newCabin);
            await Context.SaveChangesAsync();

            return newCabin;
        }

        public async Task DeleteCabin(int portalId, int cabinId)
        {
            Cabin dbCabin = await GetCabinById(portalId, cabinId);

            dbCabin.IsActive = false;
            dbCabin.IsDeleted = true;

            await Context.SaveChangesAsync();
        }

        public async Task<Cabin> UpdateCabin(int portalId, int cabinId, CabinModel cabin)
        {
            Cabin dbCabin = await GetCabinById(portalId, cabinId);

            if (!string.Equals(dbCabin.Name, cabin.Name.Trim(), StringComparison.CurrentCultureIgnoreCase))
            {
                IEnumerable<Cabin> existingCabins = await GetCabinsByName(portalId, cabin.Name);

                if (existingCabins.Any())
                {
                    throw new Exception("This cabin already exists. Please use another name.");
                }
            }

            dbCabin.Name = cabin.Name;
            dbCabin.IsActive = cabin.IsActive;
            dbCabin.UpdatedDate = DateTimeOffset.Now;

            await Context.SaveChangesAsync();

            return dbCabin;
        }
    }
}