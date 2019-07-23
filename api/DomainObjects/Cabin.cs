using System;
using System.ComponentModel.DataAnnotations;
using CandeeCamp.API.DomainObjects.Common;

namespace CandeeCamp.API.DomainObjects
{
    public class Cabin : ActiveDeleted
    {
        public Cabin()
        {
            CreatedDate = DateTimeOffset.UtcNow;
        }
        public string name { get; set; }

        public DateTimeOffset CreatedDate { get; set; }
    }
}