using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Reclaimed.API.DomainObjects.Common;

namespace Reclaimed.API.DomainObjects
{
    public class CamperCustomField : PrimaryId
    {
        public int CamperId { get; set; }

        [JsonIgnore]
        [ForeignKey("Id")]
        public virtual Camper Camper { get; set; }
        
        public int CustomFieldId { get; set; }

        [JsonIgnore]
        [ForeignKey("Id")]
        public virtual CustomField CustomField { get; set; }

        public string Value { get; set; }
    }
}