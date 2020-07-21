using Reclaimed.API.Context;

namespace Reclaimed.API.Repositories
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