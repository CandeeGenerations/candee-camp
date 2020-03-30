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

        public async Task<IEnumerable<SnackShopItem>> GetSnackShopItems() =>
            await Context.SnackShopItems.Where(x => !x.IsDeleted).ToListAsync();

        public async Task<SnackShopItem> GetSnackShopItemById(int snackShopItemId)
        {
            SnackShopItem dbSnackShopItem =
                await Context.SnackShopItems.FirstOrDefaultAsync(x => x.Id == snackShopItemId && !x.IsDeleted);

            if (dbSnackShopItem == null)
            {
                throw new Exception("This snack shop item does not exist.");
            }

            return dbSnackShopItem;
        }

        public async Task<IEnumerable<SnackShopItem>> GetSnackShopItemsByName(string name) => await Context
            .SnackShopItems.Where(x =>
                !x.IsDeleted && string.Equals(x.Name, name.Trim(), StringComparison.CurrentCultureIgnoreCase))
            .ToListAsync();

        public async Task<SnackShopItem> CreateSnackShopItem(SnackShopItemModel snackShopItem)
        {
            IEnumerable<SnackShopItem> existingSnackShopItems = await GetSnackShopItemsByName(snackShopItem.Name);

            if (existingSnackShopItems.Any())
            {
                throw new Exception("This snack shop item already exists. Please use another name.");
            }

            SnackShopItem newSnackShopItem = new SnackShopItem
            {
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

        public async Task DeleteSnackShopItem(int snackShopItemId)
        {
            SnackShopItem dbSnackShopItem = await GetSnackShopItemById(snackShopItemId);

            dbSnackShopItem.IsActive = false;
            dbSnackShopItem.IsDeleted = true;

            await Context.SaveChangesAsync();
        }

        public async Task<SnackShopItem> UpdateSnackShopItem(int snackShopItemId, SnackShopItemModel snackShopItem)
        {
            SnackShopItem dbSnackShopItem = await GetSnackShopItemById(snackShopItemId);

            if (!string.Equals(dbSnackShopItem.Name, snackShopItem.Name.Trim(),
                StringComparison.CurrentCultureIgnoreCase))
            {
                IEnumerable<SnackShopItem> existingSnackShopItems = await GetSnackShopItemsByName(snackShopItem.Name);

                if (existingSnackShopItems.Any())
                {
                    throw new Exception("This snack shop item already exists. Please use another name.");
                }
            }

            dbSnackShopItem.Name = snackShopItem.Name.Trim();
            dbSnackShopItem.Barcode = snackShopItem.Barcode.Trim();
            dbSnackShopItem.Price = snackShopItem.Price;
            dbSnackShopItem.AmountAvailable = snackShopItem.AmountAvailable;
            dbSnackShopItem.UpdatedDate = DateTimeOffset.Now;
            dbSnackShopItem.IsActive = snackShopItem.IsActive;

            await Context.SaveChangesAsync();

            return dbSnackShopItem;
        }
    }
}