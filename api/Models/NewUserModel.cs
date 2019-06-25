using System.ComponentModel.DataAnnotations;

namespace CandeeCamp.API.Models
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
        public string Password { get; set; }
        
        [Required]
        public string ConfirmPassword { get; set; }
    }
}