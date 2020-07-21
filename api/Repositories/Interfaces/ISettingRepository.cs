using System.Collections.Generic;
using System.Threading.Tasks;
using Reclaimed.API.Common;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface ISettingRepository
    {
        Task<IEnumerable<Setting>> GetSettings(int portalId);
        Task<Setting> GetSettingByKey(int portalId, SettingKey key);
        Task<Setting> UpdateSetting(int portalId, SettingKey key, string value);
        Task<IEnumerable<Setting>> UpdateSettings(int portalId, IEnumerable<SettingModel> settings);
    }
}