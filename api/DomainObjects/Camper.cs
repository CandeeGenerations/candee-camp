using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;
using System.Text.Json.Serialization;
using Reclaimed.API.DomainObjects.Common;

namespace Reclaimed.API.DomainObjects
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

        public decimal StartingBalance { get; set; }

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
        
        public int PortalId { get; set; }

        [ForeignKey("Id")]
        public virtual Portal Portal { get; set; }
    }

    public class AdjustedCamper : Camper
    {
        public AdjustedCamper(Camper camper)
        {
            Camper = camper;
            CustomFields = new List<CamperCustomField>();

            foreach (PropertyInfo prop in camper.GetType().GetProperties())
            {
                GetType().GetProperty(prop.Name)?.SetValue(this, prop.GetValue(camper));
            }
        }
        
        [JsonIgnore]
        public Camper Camper { get; set; }
        
        public int? CouponId { get; set; }
        
        public IEnumerable<CamperCustomField> CustomFields { get; set; }
    }
}