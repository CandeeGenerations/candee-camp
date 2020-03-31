using System;
using System.ComponentModel.DataAnnotations;
using Reclaimed.API.DomainObjects.Common;

namespace Reclaimed.API.DomainObjects
{
    public class User : ActiveDeleted
    {
        public User()
        {
            CreatedDate = DateTimeOffset.UtcNow;
        }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }
        
        [Required, EmailAddress]
        public string EmailAddress { get; set; }
        
        [Required]
        public string PasswordHash { get; set; }
        
        [Required]
        public string Salt { get; set; }
        
        public string UserRole { get; set; }
        
        public DateTimeOffset CreatedDate { get; set; }

        public DateTimeOffset UpdatedDate { get; set; }

        public DateTimeOffset? LastLoggedInDate { get; set; }
        
        public string ResetPasswordToken { get; set; }

        public DateTimeOffset? ResetPasswordExpirationDate { get; set; }
    }
}