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
    public class CounselorRepository : BaseRepository, ICounselorRepository
    {
        public CounselorRepository(CampContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Counselor>> GetCounselors() =>
            await Context.Counselors.Where(x => !x.IsDeleted).ToListAsync();

        public async Task<Counselor> GetCounselorById(int counselorId)
        {
            Counselor dbCounselor =
                await Context.Counselors.FirstOrDefaultAsync(x => x.Id == counselorId && !x.IsDeleted);

            if (dbCounselor == null)
            {
                throw new Exception("This counselor does not exist");
            }

            return dbCounselor;
        }

        public async Task<Counselor> CreateCounselor(CounselorModel counselor)
        {
            Counselor newCounselor = new Counselor
            {
                FirstName = counselor.FirstName.Trim(),
                LastName = counselor.LastName.Trim(),
                StartingBalance = counselor.StartingBalance,
                CreatedBy = counselor.CreatedBy,
                CreatedDate = DateTimeOffset.Now,
                UpdatedDate = DateTimeOffset.Now,
                UserId = counselor.UserId,
                IsActive = true,
                IsDeleted = false
            };

            await Context.Counselors.AddAsync(newCounselor);
            await Context.SaveChangesAsync();

            return newCounselor;
        }

        public async Task DeleteCounselor(int counselorId)
        {
            Counselor dbCounselor = await GetCounselorById(counselorId);

            dbCounselor.IsActive = false;
            dbCounselor.IsDeleted = true;

            await Context.SaveChangesAsync();
        }

        public async Task<Counselor> UpdateCounselor(int counselorId, CounselorModel counselor)
        {
            Counselor dbCounselor = await GetCounselorById(counselorId);

            dbCounselor.FirstName = counselor.FirstName.Trim();
            dbCounselor.LastName = counselor.LastName.Trim();
            dbCounselor.StartingBalance = counselor.StartingBalance;
            dbCounselor.IsActive = counselor.IsActive;
            dbCounselor.UpdatedDate = DateTimeOffset.Now;
            dbCounselor.UserId = counselor.UserId;

            await Context.SaveChangesAsync();

            return dbCounselor;
        }
    }
}