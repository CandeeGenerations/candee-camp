using System;
using System.ComponentModel.DataAnnotations;
using Reclaimed.API.DomainObjects.Common;

namespace Reclaimed.API.DomainObjects
{
    public class Portal : PrimaryId
    {
        public Portal()
        {
            CreatedDate = DateTimeOffset.Now;
        }

        [Required]
        public string Name { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public bool IsActive { get; set; }
    }
}