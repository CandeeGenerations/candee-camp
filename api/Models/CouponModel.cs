using System;
using System.ComponentModel.DataAnnotations;

namespace Reclaimed.API.Models
{
    public class CouponModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Code { get; set; }

        public bool IsActive { get; set; }

        [Required]
        public int CreatedBy { get; set; }

        public DateTimeOffset? ExpirationDate { get; set; }
    }
}