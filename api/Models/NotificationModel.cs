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

        public string Stuff { get; set; }

        public string Things { get; set; }

        public string Again { get; set; }

        public string Data { get; set; }
    }
}