using System;
using System.ComponentModel.DataAnnotations.Schema;
using Reclaimed.API.DomainObjects.Common;

namespace Reclaimed.API.DomainObjects
{
    public class CustomField : ActiveDeleted
    {
        public string Name { get; set; }

        public string FieldType { get; set; }

        public bool Required { get; set; }

        public int SortOrder { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public DateTimeOffset UpdatedDate { get; set; }
        
        public int CreatedBy { get; set; }

        [ForeignKey("Id")]
        public virtual User CreatedByUser { get; set; }
    }
}