using CandeeCamp.API.Context;

namespace CandeeCamp.API.Repositories
{
    public class BaseRepository
    {
        protected CampContext Context { get; set; }

        public BaseRepository(CampContext context)
        {
            Context = context;
        }
    }
}