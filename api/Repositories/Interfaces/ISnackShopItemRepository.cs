using System.Collections.Generic;
using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface ISnackShopItemRepository
    {
        Task<IEnumerable<SnackShopItem>> GetSnackShopItems(int portalId);
        Task<SnackShopItem> GetSnackShopItemById(int portalId, int snackShopItemId);
        Task<IEnumerable<SnackShopItem>> GetSnackShopItemsByName(int portalId, string name);
        Task<SnackShopItem> CreateSnackShopItem(int portalId, SnackShopItemModel snackShopItem);
        Task DeleteSnackShopItem(int portalId, int snackShopItemId);
        Task<SnackShopItem> UpdateSnackShopItem(int portalId, int snackShopItemId, SnackShopItemModel snackShopItem);
    }
}