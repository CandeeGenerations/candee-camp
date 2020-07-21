using System.ComponentModel.DataAnnotations;

namespace Reclaimed.API.Models
{
    public class UserModel
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }
        
        [Required, EmailAddress]
        public string EmailAddress { get; set; }

        public string UserRole { get; set; }

        public bool IsActive { get; set; }
    }
}