using System.ComponentModel.DataAnnotations;

namespace CandeeCamp.API.Models
{
    public class GroupModel
    {
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        public int? LoginUser { get; set; }

        public bool IsActive { get; set; }

        public int? CreatedBy { get; set; }
        
        public int[] Campers { get; set; }
    }
}