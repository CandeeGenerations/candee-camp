using System;
using System.ComponentModel.DataAnnotations;
using CandeeCamp.API.DomainObjects.Common;

namespace CandeeCamp.API.DomainObjects
{
    public class SnackShopItem : ActiveDeleted
    {
        public SnackShopItem()
        {
            CreatedDate = DateTimeOffset.UtcNow;
        }
        
        public string Name { get; set; }

        public string Barcode { get; set; }

        public int AmountAvailable { get; set; }



        public DateTimeOffset CreatedDate { get; set; }

    }
}