using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CandeeCamp.API.Context;
using CandeeCamp.API.DomainObjects;
using CandeeCamp.API.Models;
using CandeeCamp.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CandeeCamp.API.Repositories
{
    public class SnackShopPurchaseRepository : BaseRepository, ISnackShopPurchaseRepository
    {
        public SnackShopPurchaseRepository(CampContext context) : base(context)
        {
        }

        public async Task<IEnumerable<SnackShopPurchase>> GetSnackShopPurchases(int sourceId,
            SnackShopPurchaseSource source)
        {
            IQueryable<SnackShopPurchase> snackShopPurchases =
                Context.SnackShopPurchases.Where(x => !x.IsDeleted && x.IsActive);

            snackShopPurchases = source switch
            {
                SnackShopPurchaseSource.Camper => snackShopPurchases.Where(x => x.CamperId == sourceId),
                SnackShopPurchaseSource.Counselor => snackShopPurchases.Where(x => x.CounselorId == sourceId),
                _ => throw new ArgumentOutOfRangeException(nameof(source), source, "The source is required.")
            };

            return await snackShopPurchases.ToListAsync();
        }

        public async Task<SnackShopPurchase> GetSnackShopPurchaseById(int sourceId, int snackShopPurchaseId,
            SnackShopPurchaseSource source)
        {
            IQueryable<SnackShopPurchase> snackShopPurchaseQuery =
                Context.SnackShopPurchases.Where(x => !x.IsDeleted && x.IsActive);

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

        public async Task<SnackShopPurchase> CreateSnackShopPurchase(int sourceId, SnackShopPurchaseSource source,
            SnackShopPurchaseModel snackShopPurchase)
        {
            SnackShopPurchase newSnackShopPurchase = new SnackShopPurchase
            {
                PurchasedPrice = snackShopPurchase.PurchasePrice,
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

        public async Task<SnackShopPurchase> UpdateSnackShopPurchase(int sourceId, int snackShopPurchaseId,
            SnackShopPurchaseSource source, SnackShopPurchaseModel snackShopPurchase)
        {
            SnackShopPurchase dbSnackShopPurchase =
                await GetSnackShopPurchaseById(sourceId, snackShopPurchaseId, source);

            dbSnackShopPurchase.PurchasedDate = DateTimeOffset.Now;
            dbSnackShopPurchase.PurchasedPrice = snackShopPurchase.PurchasePrice;
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

        public async Task DeleteSnackShopPurchase(int sourceId, int snackShopPurchaseId, SnackShopPurchaseSource source)
        {
            SnackShopPurchase dbSnackShopPurchase =
                await GetSnackShopPurchaseById(sourceId, snackShopPurchaseId, source);

            dbSnackShopPurchase.IsActive = false;
            dbSnackShopPurchase.IsDeleted = true;

            await Context.SaveChangesAsync();
        }
    }
}