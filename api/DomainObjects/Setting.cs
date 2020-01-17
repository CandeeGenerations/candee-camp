using System.ComponentModel.DataAnnotations;
using CandeeCamp.API.DomainObjects.Common;

namespace CandeeCamp.API.DomainObjects
{
    public class Setting
    {
        [Key]
        public string Key { get; set; }

        public string Value { get; set; }

        public int Version { get; set; }

        public bool Sensitive { get; set; }
    }
}