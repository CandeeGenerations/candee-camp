using System.Collections.Generic;
using System.Threading.Tasks;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Models;

namespace CandeeCamp.API.Repositories.Interfaces
{
    public interface ISnackShopItemRepository
    {
        Task<IEnumerable<SnackShopItem>> GetSnackShopItems();
        Task<SnackShopItem> GetSnackShopItemById(int snackShopItemId);
        Task<IEnumerable<SnackShopItem>> GetSnackShopItemsByName(string name);
        Task<SnackShopItem> CreateSnackShopItem(SnackShopItemModel snackShopItem);
        Task DeleteSnackShopItem(int snackShopItemId);
        Task<SnackShopItem> UpdateSnackShopItem(int snackShopItemId, SnackShopItemModel snackShopItem);
    }
}