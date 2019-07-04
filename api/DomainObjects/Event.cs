using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CandeeCamp.API.DomainObjects
{
    public class Event
    {
        //[Key, Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public DateTimeOffset StartDate { get; set; }

        public DateTimeOffset EndDate { get; set; }

        public byte IsActive { get; set; }

        public byte isDeleted { get; set; }

        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTimeOffset CreatedDate { get; set; } = DateTimeOffset.UtcNow;

        
        public int? CreatedBy { get; set; }
        [ForeignKey("Id")]
        public virtual User User { get; set; }
        

        
    }
}