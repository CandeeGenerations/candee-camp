using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CandeeCamp.API.DomainObjects.Common;

namespace CandeeCamp.API.DomainObjects
{
    public class Group : ActiveDeleted
    {
        public Group()
        {
            CreatedDate = DateTimeOffset.UtcNow;
        }

        [Required]
        public string GroupName { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public int LoginUser { get; set; }
        
        [ForeignKey("Id")]
        public virtual User User { get; set; }
    }
}