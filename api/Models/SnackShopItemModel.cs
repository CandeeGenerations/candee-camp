using System.ComponentModel.DataAnnotations;

namespace CandeeCamp.API.Models
{
    public class SnackShopItemModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public decimal Price { get; set; }

        public string Barcode { get; set; }

        public int AmountAvailable { get; set; }

        public bool IsActive { get; set; }

        [Required]
        public int CreatedBy { get; set; }
    }
}