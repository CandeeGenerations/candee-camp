using System;
using System.ComponentModel.DataAnnotations;

namespace CandeeCamp.API.DomainObjects
{
    public class Event
    {
        [Key, Required]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}