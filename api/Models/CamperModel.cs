using System;
using System.ComponentModel.DataAnnotations;

namespace CandeeCamp.API.Models
{
    public class CamperModel
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public DateTimeOffset? BirthDate { get; set; }

        public string ParentFirstName { get; set; }

        public string ParentLastName { get; set; }

        public string Medicine { get; set; }

        public string Allergies { get; set; }

        public bool IsActive { get; set; }

        [Required]
        public int CreatedBy { get; set; }

        public int? LoginUser { get; set; }
        
        public int? GroupId { get; set; }
        
        public int? CabinId { get; set; }
        
        public int? CounselorId { get; set; }

        public bool IsMinor => BirthDate > DateTimeOffset.Now.AddYears(-18) && BirthDate <= DateTimeOffset.Now;
    }
} 