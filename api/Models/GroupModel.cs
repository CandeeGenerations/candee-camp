using System.ComponentModel.DataAnnotations;

namespace CandeeCamp.API.Models
{
    public class GroupModel
    {
        [Required]
        public string Name { get; set; }
        
        [Required]
        public int LoginUser { get; set; }

        public bool IsActive { get; set; }
    }
}