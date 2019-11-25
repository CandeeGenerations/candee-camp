using System;
using System.ComponentModel.DataAnnotations.Schema;
using CandeeCamp.API.DomainObjects.Common;

namespace CandeeCamp.API.DomainObjects
{
    public class Camper : ActiveDeleted
    {
        public Camper()
        {
            CreatedDate = DateTimeOffset.UtcNow;
        }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTimeOffset? BirthDate { get; set; }

        public string ParentFirstName { get; set; }

        public string ParentLastName { get; set; }

        public string Medicine { get; set; }

        public string Allergies { get; set; }

        public DateTimeOffset CreatedDate { get; set; }
        
        public DateTimeOffset UpdatedDate { get; set; }

        public int? LoginUser { get; set; }

        [ForeignKey("Id")]
        public virtual User User { get; set; }

        public int? CreatedBy { get; set; }
        
        [ForeignKey("CreatedBy")]
        public virtual User CreatedByUser { get; set; }

        public int? GroupId { get; set; }

        [ForeignKey("Id")]
        public virtual Group Group { get; set; }

        public int? CabinId { get; set; }

        [ForeignKey("Id")]
        public virtual Cabin Cabin { get; set; }

        public int? CounselorId { get; set; }

        [ForeignKey("Id")]
        public virtual Counselor Counselor { get; set; }
    }
}