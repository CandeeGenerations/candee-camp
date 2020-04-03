using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Reclaimed.API.Context;
using Reclaimed.API.DomainObjects;
using Reclaimed.API.Models;
using Reclaimed.API.Repositories.Interfaces;

namespace Reclaimed.API.Repositories
{
    public class SnackShopPurchaseRepository : BaseRepository, ISnackShopPurchaseRepository
    {
        public SnackShopPurchaseRepository(CampContext context) : base(context)
        {
        }

        public async Task<IEnumerable<SnackShopPurchase>> GetSnackShopPurchases(int portalId, int sourceId,
            SnackShopPurchaseSource source)
        {
            IQueryable<SnackShopPurchase> snackShopPurchases =
                Context.SnackShopPurchases.Where(x =>
                    x.PortalId == portalId && !x.IsDeleted && x.IsActive && x.SnackShopItem.IsActive &&
                    !x.SnackShopItem.IsDeleted);

            snackShopPurchases = source switch
            {
                SnackShopPurchaseSource.Camper => snackShopPurchases.Where(x => x.CamperId == sourceId),
                SnackShopPurchaseSource.Counselor => snackShopPurchases.Where(x => x.CounselorId == sourceId),
                _ => throw new ArgumentOutOfRangeException(nameof(source), source, "The source is required.")
            };

            return await snackShopPurchases.ToListAsync();
        }

        public async Task<SnackShopPurchase> GetSnackShopPurchaseById(int portalId, int sourceId,
            int snackShopPurchaseId,
            SnackShopPurchaseSource source)
        {
            IQueryable<SnackShopPurchase> snackShopPurchaseQuery =
                Context.SnackShopPurchases.Where(x =>
                    x.PortalId == portalId && !x.IsDeleted && x.IsActive && x.Id == snackShopPurchaseId &&
                    x.SnackShopItem.IsActive &&
                    !x.SnackShopItem.IsDeleted);

            snackShopPurchaseQuery = source switch
            {
                SnackShopPurchaseSource.Camper => snackShopPurchaseQuery.Where(x => x.CamperId == sourceId),
                SnackShopPurchaseSource.Counselor => snackShopPurchaseQuery.Where(x => x.CounselorId == sourceId),
                _ => throw new ArgumentOutOfRangeException(nameof(source), source, "The source is required.")
            };

            SnackShopPurchase snackShopPurchase = await snackShopPurchaseQuery.FirstOrDefaultAsync();

            if (snackShopPurchase == null)
            {
                throw new Exception("This snack shop purchase does not exist.");
            }

            return snackShopPurchase;
        }

        public async Task<SnackShopPurchase> CreateSnackShopPurchase(int portalId, int sourceId,
            SnackShopPurchaseSource source,
            SnackShopPurchaseModel snackShopPurchase)
        {
            SnackShopPurchase newSnackShopPurchase = new SnackShopPurchase
            {
                PortalId = portalId,
                PurchasedPrice = snackShopPurchase.PurchasedPrice,
                PurchasedDate = DateTimeOffset.Now,
                IsActive = true,
                IsDeleted = false,
                SnackShopItemId = snackShopPurchase.SnackShopItemId,
                CreatedBy = snackShopPurchase.CreatedBy,
            };

            switch (source)
            {
                case SnackShopPurchaseSource.Camper:
                    newSnackShopPurchase.CamperId = sourceId;
                    break;

                case SnackShopPurchaseSource.Counselor:
                    newSnackShopPurchase.CounselorId = sourceId;
                    break;

                default:
                    throw new ArgumentOutOfRangeException(nameof(source), source, "The source is required.");
            }

            await Context.SnackShopPurchases.AddAsync(newSnackShopPurchase);
            await Context.SaveChangesAsync();

            return newSnackShopPurchase;
        }

        public async Task<SnackShopPurchase> UpdateSnackShopPurchase(int portalId, int sourceId,
            int snackShopPurchaseId,
            SnackShopPurchaseSource source, SnackShopPurchaseModel snackShopPurchase)
        {
            SnackShopPurchase dbSnackShopPurchase =
                await GetSnackShopPurchaseById(portalId, sourceId, snackShopPurchaseId, source);

            dbSnackShopPurchase.PurchasedDate = DateTimeOffset.Now;
            dbSnackShopPurchase.PurchasedPrice = snackShopPurchase.PurchasedPrice;
            dbSnackShopPurchase.SnackShopItemId = snackShopPurchase.SnackShopItemId;

            switch (source)
            {
                case SnackShopPurchaseSource.Camper:
                    dbSnackShopPurchase.CamperId = sourceId;
                    break;

                case SnackShopPurchaseSource.Counselor:
                    dbSnackShopPurchase.CounselorId = sourceId;
                    break;

                default:
                    throw new ArgumentOutOfRangeException(nameof(source), source, "The source is required.");
            }

            await Context.SaveChangesAsync();

            return dbSnackShopPurchase;
        }

        public async Task DeleteSnackShopPurchase(int portalId, int sourceId, int snackShopPurchaseId,
            SnackShopPurchaseSource source)
        {
            SnackShopPurchase dbSnackShopPurchase =
                await GetSnackShopPurchaseById(portalId, sourceId, snackShopPurchaseId, source);

            dbSnackShopPurchase.IsActive = false;
            dbSnackShopPurchase.IsDeleted = true;

            await Context.SaveChangesAsync();
        }
    }
}