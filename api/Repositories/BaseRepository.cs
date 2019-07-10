using System;
using CandeeCamp.API.Context;
using CandeeCamp.API.DomainObjects.Common;

namespace CandeeCamp.API.Repositories
{
    public class BaseRepository
    {
        protected CampContext Context { get; set; }

        public BaseRepository(CampContext context)
        {
            Context = context;
        }

        public Func<ActiveDeleted, bool> IsActive = x => x.IsActive && !x.IsDeleted;
    }
}