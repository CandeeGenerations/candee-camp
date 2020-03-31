using System.Collections.Generic;
using System.Threading.Tasks;
using Reclaimed.API.Common;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface ISettingRepository
    {
        Task<IEnumerable<Setting>> GetSettings();
        Task<Setting> GetSettingByKey(SettingKey key);
        Task<Setting> UpdateSetting(SettingKey key, string value);
        Task<IEnumerable<Setting>> UpdateSettings(IEnumerable<SettingModel> settings);
    }
}