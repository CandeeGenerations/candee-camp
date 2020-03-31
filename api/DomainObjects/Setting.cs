using System.ComponentModel.DataAnnotations;

namespace Reclaimed.API.DomainObjects
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