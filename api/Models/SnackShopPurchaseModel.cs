using System.ComponentModel.DataAnnotations;

namespace CandeeCamp.API.Models
{
    public enum SnackShopPurchaseSource
    {
        Camper = 1,
        Counselor = 2,
    }
    
    public class SnackShopPurchaseModel
    {
        public decimal PurchasedPrice { get; set; }

        [Required]
        public int SnackShopItemId { get; set; }

        [Required]
        public int CreatedBy { get; set; }
    }
}