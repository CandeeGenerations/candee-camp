using System.ComponentModel.DataAnnotations;

namespace Reclaimed.API.Models
{
    public class NewUserModel
    {
        [Required] 
        public string FirstName { get; set; }
        
        [Required]
        public string LastName { get; set; }
        
        [Required, EmailAddress]
        public string EmailAddress { get; set; }
        
        [Required]
        public string NewPassword { get; set; }
        
        [Required]
        public string ConfirmPassword { get; set; }
    }
}