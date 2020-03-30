using System;
using System.ComponentModel.DataAnnotations.Schema;
using Reclaimed.API.DomainObjects.Common;

namespace Reclaimed.API.DomainObjects
{
    public class SnackShopPurchase : ActiveDeleted
    {
        public SnackShopPurchase()
        {
            PurchasedDate = DateTimeOffset.UtcNow;
        }
                
        public DateTimeOffset PurchasedDate { get; set; }
       
        public decimal? PurchasedPrice { get; set; }

        public int SnackShopItemId { get; set; }

        [ForeignKey("Id")]
        public virtual SnackShopItem SnackShopItem { get; set; }

        public int? CamperId { get; set; }

        [ForeignKey("Id")]
        public virtual Camper Camper { get; set; }

        public int? CounselorId { get; set; }

        [ForeignKey("Id")]
        public virtual Counselor Counselor { get; set; }
        
        public int CreatedBy { get; set; }

        [ForeignKey("CreatedBy")]
        public virtual User CreatedByUser { get; set; }
    }
}