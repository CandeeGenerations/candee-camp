using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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

        public decimal Price { get; set; }

        public string Barcode { get; set; }

        public int AmountAvailable { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public DateTimeOffset UpdatedDate { get; set; }

        public int CreatedBy { get; set; }

        [ForeignKey("CreatedBy")]
        public virtual User CreatedByUser { get; set; }
    }
}