using System;
using System.ComponentModel.DataAnnotations.Schema;
using Reclaimed.API.DomainObjects.Common;

namespace Reclaimed.API.DomainObjects
{
    public class Notification : ActiveDeleted
    {
        public Notification()
        {
            CreatedDate = DateTimeOffset.UtcNow;
        }
        
        public string Name { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public DateTimeOffset UpdatedDate { get; set; }

        public int CreatedBy { get; set; }

        public string Schedule { get; set; }
        public string Descriptor { get; set; }
        public string Start { get; set; }
        public string Data { get; set; }

        [ForeignKey("CreatedBy")]
        public virtual User CreatedByUser { get; set; }

        public int PortalId { get; set; }

        [ForeignKey("Id")]
        public virtual Portal Portal { get; set; }

        //       [ForeignKey("CreatedBy")]
        //       public virtual User CreatedByUser { get; set; }

        //        public int PortalId { get; set; }

        //        [ForeignKey("Id")]
        //        public virtual Portal Portal { get; set; }
    }
}