using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CandeeCamp.API.Common;
using CandeeCamp.API.Context;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Models;
using CandeeCamp.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CandeeCamp.API.Repositories
{
    public class SettingRepository : BaseRepository, ISettingRepository
    {
        public SettingRepository(CampContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Setting>> GetSettings() => await Context.Settings.ToListAsync();

        public async Task<Setting> GetSettingByKey(SettingKey key)
        {
            Setting dbSetting =
                await Context.Settings.FirstOrDefaultAsync(x => x.Key == Enum.GetName(typeof(SettingKey), key));

            if (dbSetting == null)
            {
                throw new Exception("This setting does not exist.");
            }

            return dbSetting;
        }

        public async Task<Setting> UpdateSetting(SettingKey key, string value)
        {
            Setting dbSetting = await GetSettingByKey(key);

            dbSetting.Value = value;

            await Context.SaveChangesAsync();

            return dbSetting;
        }

        public async Task<IEnumerable<Setting>> UpdateSettings(IEnumerable<SettingModel> settings)
        {
            List<Setting> updatedSettings = new List<Setting>();

            foreach (SettingModel setting in settings)
            {
                Setting updatedSetting = await UpdateSetting(setting.Key, setting.Value);
                
                updatedSettings.Add(updatedSetting);
            }

            return updatedSettings;
        }
    }
}