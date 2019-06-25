using System;
using System.ComponentModel.DataAnnotations;

namespace CandeeCamp.API.DomainObjects.Common
{
    public class GuidId
    {
        [Key, Required]
        public Guid Id { get; set; }
    }
}