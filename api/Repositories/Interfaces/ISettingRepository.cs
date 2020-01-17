using System.Collections.Generic;
using System.Threading.Tasks;
using CandeeCamp.API.Common;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Models;

namespace CandeeCamp.API.Repositories.Interfaces
{
    public interface ISettingRepository
    {
        Task<IEnumerable<Setting>> GetSettings();
        Task<Setting> GetSettingByKey(SettingKey key);
        Task<Setting> UpdateSetting(SettingKey key, string value);
        Task<IEnumerable<Setting>> UpdateSettings(IEnumerable<SettingModel> settings);
    }
}