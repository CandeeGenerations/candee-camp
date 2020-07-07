using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;
using System.Text.Json.Serialization;
using Reclaimed.API.DomainObjects.Common;

namespace Reclaimed.API.DomainObjects
{
    public class Group : ActiveDeleted
    {
        public Group()
        {
            CreatedDate = DateTimeOffset.UtcNow;
        }

        [Required]
        public string Name { get; set; }

        public DateTimeOffset CreatedDate { get; set; }
        
        public DateTimeOffset UpdatedDate { get; set; }

        public int? LoginUser { get; set; }
        
        [ForeignKey("Id")]
        public virtual User User { get; set; }
        
        public int? CreatedBy { get; set; }
        
        [ForeignKey("CreatedBy")]
        public virtual User CreatedByUser { get; set; }
        
        public int PortalId { get; set; }

        [ForeignKey("Id")]
        public virtual Portal Portal { get; set; }
    }
    
    public class AdjustedGroup : Group
    {
        public AdjustedGroup(Group group)
        {
            Group = group;
            Campers = new int[] { };

            foreach (PropertyInfo prop in group.GetType().GetProperties())
            {
                GetType().GetProperty(prop.Name)?.SetValue(this, prop.GetValue(group));
            }
        }
        
        [JsonIgnore]
        public Group Group { get; set; }
        
        public int[] Campers { get; set; }
    }
}