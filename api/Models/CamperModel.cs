using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Reclaimed.API.Models
{
    public class CamperModel
    {
        public CamperModel()
        {
            CustomFields = new List<CamperCustomFieldModel>();
        }
        
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public DateTimeOffset? BirthDate { get; set; }

        public string ParentFirstName { get; set; }

        public string ParentLastName { get; set; }

        public string Medicine { get; set; }

        public string Allergies { get; set; }

        public decimal StartingBalance { get; set; }

        public bool IsActive { get; set; }

        public int? CreatedBy { get; set; }

        public int? LoginUser { get; set; }
        
        public int? GroupId { get; set; }
        
        public int? CabinId { get; set; }
        
        public int? CounselorId { get; set; }
        
        public int? CouponId { get; set; }
        
        public List<CamperCustomFieldModel> CustomFields { get; set; }

        public bool IsMinor => BirthDate > DateTimeOffset.Now.AddYears(-18) && BirthDate < DateTimeOffset.Now;
    }
} 