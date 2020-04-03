using System.Collections.Generic;
using System.Threading.Tasks;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;

namespace Reclaimed.API.Repositories.Interfaces
{
    public interface ISnackShopPurchaseRepository
    {
        Task<IEnumerable<SnackShopPurchase>> GetSnackShopPurchases(int portalId, int sourceId,
            SnackShopPurchaseSource source);

        Task<SnackShopPurchase> GetSnackShopPurchaseById(int portalId, int sourceId, int snackShopPurchaseId,
            SnackShopPurchaseSource source);

        Task<SnackShopPurchase>
            CreateSnackShopPurchase(int portalId, int sourceId, SnackShopPurchaseSource source,
                SnackShopPurchaseModel snackShopPurchase);

        Task<SnackShopPurchase> UpdateSnackShopPurchase(int portalId, int sourceId, int snackShopPurchaseId,
            SnackShopPurchaseSource source, SnackShopPurchaseModel snackShopPurchase);

        Task DeleteSnackShopPurchase(int portalId, int sourceId, int snackShopPurchaseId,
            SnackShopPurchaseSource source);
    }
}