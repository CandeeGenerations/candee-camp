using System.ComponentModel.DataAnnotations;

namespace Reclaimed.API.Models
{
    public class CounselorModel
    {
        [Required]
        public string FirstName { get; set; }
        
        [Required]
        public string LastName { get; set; }
        
        public decimal StartingBalance { get; set; }

        public bool IsActive { get; set; }

        [Required]
        public int CreatedBy { get; set; }

        public int UserId { get; set; }

        public int? CabinId { get; set; }
    }
}