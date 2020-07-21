using System.ComponentModel.DataAnnotations;

namespace Reclaimed.API.Models
{
    public enum CustomFieldType
    {
        String,
        Number,
        Date,
        TextBlock,
    }
    
    public class CustomFieldModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public CustomFieldType Type { get; set; }
        
        [Required]
        public bool Required { get; set; }
        
        public int? SortOrder { get; set; }

        public bool IsActive { get; set; }
        
        [Required]
        public int CreatedBy { get; set; }
    }

    public class CamperCustomFieldModel
    {
        [Required]
        public int CustomFieldId { get; set; }

        public string Value { get; set; }
    }
}