using System.ComponentModel.DataAnnotations;

namespace Reclaimed.API.Models
{
    public class CabinModel
    {
        [Required]
        public string Name { get; set; }

        public bool IsActive { get; set; }

        [Required]
        public int CreatedBy { get; set; }
    }
}