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
    public class CounselorRepository : BaseRepository, ICounselorRepository
    {
        public CounselorRepository(CampContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Counselor>> GetCounselors(int portalId, CounselorFilterModel filters = null)
        {
            IQueryable<Counselor> counselors = Context.Counselors.Where(x => x.PortalId == portalId && !x.IsDeleted);

            if (filters == null) return await counselors.ToListAsync();
            {
                if (!string.IsNullOrEmpty(filters.FirstName))
                {
                    counselors = counselors.Where(x =>
                        x.FirstName.ToLower().Contains(filters.FirstName.Trim().ToLower()));
                }

                if (!string.IsNullOrEmpty(filters.LastName))
                {
                    counselors =
                        counselors.Where(x => x.LastName.ToLower().Contains(filters.LastName.Trim().ToLower()));
                }

                if (filters.IsActive != null)
                {
                    counselors = counselors.Where(x => x.IsActive == filters.IsActive.Value);
                }

                if (filters.BalanceStart != null && filters.BalanceEnd != null)
                {
                    counselors = counselors.Where(x =>
                        x.StartingBalance >= filters.BalanceStart.Value &&
                        x.StartingBalance <= filters.BalanceEnd.Value);
                }
            }

            return await counselors.ToListAsync();
        }

        public async Task<Counselor> GetCounselorById(int portalId, int counselorId)
        {
            Counselor dbCounselor =
                await Context.Counselors.FirstOrDefaultAsync(x =>
                    x.PortalId == portalId && x.Id == counselorId && !x.IsDeleted);

            if (dbCounselor == null)
            {
                throw new Exception("This counselor does not exist");
            }

            return dbCounselor;
        }

        public async Task<Counselor> CreateCounselor(int portalId, CounselorModel counselor)
        {
            Counselor newCounselor = new Counselor
            {
                PortalId = portalId,
                FirstName = counselor.FirstName.Trim(),
                LastName = counselor.LastName.Trim(),
                StartingBalance = counselor.StartingBalance,
                CreatedBy = counselor.CreatedBy,
                CreatedDate = DateTimeOffset.Now,
                UpdatedDate = DateTimeOffset.Now,
                UserId = counselor.UserId,
                CabinId = counselor.CabinId,
                IsActive = true,
                IsDeleted = false
            };

            await Context.Counselors.AddAsync(newCounselor);
            await Context.SaveChangesAsync();

            return newCounselor;
        }

        public async Task DeleteCounselor(int portalId, int counselorId)
        {
            Counselor dbCounselor = await GetCounselorById(portalId, counselorId);

            dbCounselor.IsActive = false;
            dbCounselor.IsDeleted = true;

            await Context.SaveChangesAsync();
        }

        public async Task<Counselor> UpdateCounselor(int portalId, int counselorId, CounselorModel counselor)
        {
            Counselor dbCounselor = await GetCounselorById(portalId, counselorId);

            dbCounselor.FirstName = counselor.FirstName.Trim();
            dbCounselor.LastName = counselor.LastName.Trim();
            dbCounselor.StartingBalance = counselor.StartingBalance;
            dbCounselor.IsActive = counselor.IsActive;
            dbCounselor.UpdatedDate = DateTimeOffset.Now;
            dbCounselor.UserId = counselor.UserId;
            dbCounselor.CabinId = counselor.CabinId;

            await Context.SaveChangesAsync();

            return dbCounselor;
        }
    }
}