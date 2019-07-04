using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CandeeCamp.API.DomainObjects.Common;

namespace CandeeCamp.API.DomainObjects
{
    public class User //: GuidId
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key]
        public int Id { get; set; }

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
        
        //[Required]
        public DateTimeOffset CreatedDate { get; set; } = DateTimeOffset.UtcNow;

        public string ResetPasswordToken { get; set; }

        public DateTimeOffset ResetPasswordExpirationDate { get; set; }

        public DateTimeOffset LastLoggedInDate { get; set; }

        public string RefreshToken { get; set; }
    }
}