using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
    }
}