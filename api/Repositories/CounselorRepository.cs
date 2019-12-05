using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CandeeCamp.API.Context;
using CandeeCamp.API.DomainObjects;
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
    }
}