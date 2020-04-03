using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Reclaimed.API.Common;
using Reclaimed.API.Context;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;
using Reclaimed.API.Repositories.Interfaces;

namespace Reclaimed.API.Repositories
{
    public class SettingRepository : BaseRepository, ISettingRepository
    {
        public SettingRepository(CampContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Setting>> GetSettings(int portalId) =>
            await Context.Settings.Where(x => x.PortalId == portalId).ToListAsync();

        public async Task<Setting> GetSettingByKey(int portalId, SettingKey key)
        {
            Setting dbSetting =
                await Context.Settings.FirstOrDefaultAsync(x =>
                    x.PortalId == portalId && x.Key == Enum.GetName(typeof(SettingKey), key));

            if (dbSetting == null)
            {
                throw new Exception("This setting does not exist.");
            }

            return dbSetting;
        }

        public async Task<Setting> UpdateSetting(int portalId, SettingKey key, string value)
        {
            Setting dbSetting = await GetSettingByKey(portalId, key);

            dbSetting.Value = value;

            await Context.SaveChangesAsync();

            return dbSetting;
        }

        public async Task<IEnumerable<Setting>> UpdateSettings(int portalId, IEnumerable<SettingModel> settings)
        {
            List<Setting> updatedSettings = new List<Setting>();

            foreach (SettingModel setting in settings)
            {
                Setting updatedSetting = await UpdateSetting(portalId, setting.Key, setting.Value);

                updatedSettings.Add(updatedSetting);
            }

            return updatedSettings;
        }
    }
}