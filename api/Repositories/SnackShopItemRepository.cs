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
    public class SnackShopItemRepository : BaseRepository, ISnackShopItemRepository
    {
        public SnackShopItemRepository(CampContext context) : base(context)
        {
        }

        public async Task<IEnumerable<SnackShopItem>> GetSnackShopItems(int portalId,
            SnackShopItemFilterModel filters = null)
        {
            IQueryable<SnackShopItem> snackShopItems =
                Context.SnackShopItems.Where(x => x.PortalId == portalId && !x.IsDeleted);

            if (filters == null) return await snackShopItems.ToListAsync();
            {
                if (!string.IsNullOrEmpty(filters.Name))
                {
                    snackShopItems =
                        snackShopItems.Where(x => x.Name.ToLower().Contains(filters.Name.Trim().ToLower()));
                }

                if (!string.IsNullOrEmpty(filters.Barcode))
                {
                    snackShopItems =
                        snackShopItems.Where(x => x.Barcode.ToLower().Contains(filters.Barcode.Trim().ToLower()));
                }

                if (filters.HasBarcode != null)
                {
                    snackShopItems = filters.HasBarcode.Value
                        ? snackShopItems.Where(x => x.Barcode != null)
                        : snackShopItems.Where(x => x.Barcode == null);
                }
                
                if (filters.PriceStart != null && filters.PriceEnd != null)
                {
                    snackShopItems = snackShopItems.Where(x =>
                        x.Price >= filters.PriceStart.Value && x.Price <= filters.PriceEnd.Value);
                }
                
                if (filters.AmountAvailableStart != null && filters.AmountAvailableEnd != null)
                {
                    snackShopItems = snackShopItems.Where(x =>
                        x.AmountAvailable >= filters.AmountAvailableStart.Value &&
                        x.AmountAvailable <= filters.AmountAvailableEnd.Value);
                }

                if (filters.IsActive != null)
                {
                    snackShopItems = snackShopItems.Where(x => x.IsActive == filters.IsActive.Value);
                }
            }

            return await snackShopItems.ToListAsync();
        }

        public async Task<SnackShopItem> GetSnackShopItemById(int portalId, int snackShopItemId)
        {
            SnackShopItem dbSnackShopItem =
                await Context.SnackShopItems.FirstOrDefaultAsync(x =>
                    x.PortalId == portalId && x.Id == snackShopItemId && !x.IsDeleted);

            if (dbSnackShopItem == null)
            {
                throw new Exception("This snack shop item does not exist.");
            }

            return dbSnackShopItem;
        }

        public async Task<IEnumerable<SnackShopItem>> GetSnackShopItemsByName(int portalId, string name) =>
            await Context
                .SnackShopItems.Where(x =>
                    x.PortalId == portalId && !x.IsDeleted && string.Equals(x.Name, name.Trim(),
                        StringComparison.CurrentCultureIgnoreCase))
                .ToListAsync();

        public async Task<SnackShopItem> CreateSnackShopItem(int portalId, SnackShopItemModel snackShopItem)
        {
            IEnumerable<SnackShopItem> existingSnackShopItems =
                await GetSnackShopItemsByName(portalId, snackShopItem.Name);

            if (existingSnackShopItems.Any())
            {
                throw new Exception("This snack shop item already exists. Please use another name.");
            }

            SnackShopItem newSnackShopItem = new SnackShopItem
            {
                PortalId = portalId,
                Name = snackShopItem.Name.Trim(),
                Barcode = snackShopItem.Barcode?.Trim(),
                Price = snackShopItem.Price,
                AmountAvailable = snackShopItem.AmountAvailable,
                CreatedBy = snackShopItem.CreatedBy,
                IsActive = true,
                IsDeleted = false,
                CreatedDate = DateTimeOffset.Now,
                UpdatedDate = DateTimeOffset.Now,
            };

            await Context.SnackShopItems.AddAsync(newSnackShopItem);
            await Context.SaveChangesAsync();

            return newSnackShopItem;
        }

        public async Task DeleteSnackShopItem(int portalId, int snackShopItemId)
        {
            SnackShopItem dbSnackShopItem = await GetSnackShopItemById(portalId, snackShopItemId);

            dbSnackShopItem.IsActive = false;
            dbSnackShopItem.IsDeleted = true;

            await Context.SaveChangesAsync();
        }

        public async Task<SnackShopItem> UpdateSnackShopItem(int portalId, int snackShopItemId,
            SnackShopItemModel snackShopItem)
        {
            SnackShopItem dbSnackShopItem = await GetSnackShopItemById(portalId, snackShopItemId);

            if (!string.Equals(dbSnackShopItem.Name, snackShopItem.Name.Trim(),
                StringComparison.CurrentCultureIgnoreCase))
            {
                IEnumerable<SnackShopItem> existingSnackShopItems =
                    await GetSnackShopItemsByName(portalId, snackShopItem.Name);

                if (existingSnackShopItems.Any())
                {
                    throw new Exception("This snack shop item already exists. Please use another name.");
                }
            }

            dbSnackShopItem.Name = snackShopItem.Name.Trim();
            dbSnackShopItem.Barcode = snackShopItem.Barcode?.Trim();
            dbSnackShopItem.Price = snackShopItem.Price;
            dbSnackShopItem.AmountAvailable = snackShopItem.AmountAvailable;
            dbSnackShopItem.UpdatedDate = DateTimeOffset.Now;
            dbSnackShopItem.IsActive = snackShopItem.IsActive;

            await Context.SaveChangesAsync();

            return dbSnackShopItem;
        }
    }
}