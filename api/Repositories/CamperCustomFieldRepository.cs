using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CandeeCamp.API.Context;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CandeeCamp.API.Repositories
{
    public class CamperCustomFieldRepository : BaseRepository, ICamperCustomFieldRepository
    {
        public CamperCustomFieldRepository(CampContext context) : base(context)
        {
        }

        public async Task<IEnumerable<CamperCustomField>> GetCamperCustomFields(int camperId) =>
            await Context.CamperCustomFields.Where(x => x.CamperId == camperId).ToListAsync();

        public async Task<CamperCustomField> GetCamperCustomField(int camperId, int customFieldId) =>
            await Context.CamperCustomFields.FirstOrDefaultAsync(x =>
                x.CamperId == camperId && x.CustomFieldId == customFieldId);

        public async Task<CamperCustomField> SaveCamperCustomField(int camperId, int customFieldId, string value)
        {
            CamperCustomField dbCamperCustomField = await GetCamperCustomField(camperId, customFieldId);

            if (dbCamperCustomField == null)
            {
                dbCamperCustomField = new CamperCustomField
                {
                    CamperId = camperId,
                    CustomFieldId = customFieldId,
                    Value = value.Trim()
                };

                await Context.CamperCustomFields.AddAsync(dbCamperCustomField);
            }
            else
            {
                dbCamperCustomField.Value = value.Trim();
            }
            
            await Context.SaveChangesAsync();

            return dbCamperCustomField;
        }
    }
}