using System;
using System.ComponentModel.DataAnnotations;

namespace Reclaimed.API.Models
{
    public enum CouponType
    {
        Dollar = 1,
        Percent = 2,
    }
    
    public class CouponModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Code { get; set; }
        
        [Required]
        public CouponType Type { get; set; }
        
        [Required]
        public decimal Amount { get; set; }

        public bool IsActive { get; set; }

        [Required]
        public int CreatedBy { get; set; }

        public DateTimeOffset? ExpirationDate { get; set; }
    }
}