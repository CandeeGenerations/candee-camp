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
    public class CabinRepository : BaseRepository, ICabinRepository
    {
        public CabinRepository(CampContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Cabin>> GetCabins() =>
            await Context.Cabins.Where(x => !x.IsDeleted).ToListAsync();

        public async Task<Cabin> GetCabinById(int cabinId)
        {
            Cabin dbCabin = await Context.Cabins.FirstOrDefaultAsync(x => x.Id == cabinId && !x.IsDeleted);

            if (dbCabin == null)
            {
                throw new Exception("This cabin does not exist.");
            }

            return dbCabin;
        }

        public async Task<IEnumerable<Cabin>> GetCabinsByName(string name) => await Context.Cabins
            .Where(x => !x.IsDeleted && string.Equals(x.Name, name.Trim(), StringComparison.CurrentCultureIgnoreCase))
            .ToListAsync();

        public async Task<Cabin> CreateCabin(CabinModel cabin)
        {
            IEnumerable<Cabin> existingCabins = await GetCabinsByName(cabin.Name);

            if (existingCabins.Any())
            {
                throw new Exception("This cabin already exists. Please use another name.");
            }
            
            Cabin newCabin = new Cabin
            {
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

        public async Task DeleteCabin(int cabinId)
        {
            Cabin dbCabin = await GetCabinById(cabinId);

            dbCabin.IsActive = false;
            dbCabin.IsDeleted = true;

            await Context.SaveChangesAsync();
        }

        public async Task<Cabin> UpdateCabin(int cabinId, CabinModel cabin)
        {
            Cabin dbCabin = await GetCabinById(cabinId);

            if (!string.Equals(dbCabin.Name, cabin.Name.Trim(), StringComparison.CurrentCultureIgnoreCase))
            {
                IEnumerable<Cabin> existingCabins = await GetCabinsByName(cabin.Name);

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