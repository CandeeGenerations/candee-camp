using System.ComponentModel.DataAnnotations;

namespace Reclaimed.API.Models
{
    public class NotificationModel
    {
        [Required]
        public string Name { get; set; }

        public bool IsActive { get; set; }

        [Required]
        public int CreatedBy { get; set; }

        public string Schedule { get; set; }

        public string Descriptor { get; set; }

        public string Start { get; set; }

        public string Data { get; set; }
    }
}