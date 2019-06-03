using System;
using System.ComponentModel.DataAnnotations;
using CandeeCamp.API.DomainObjects.Common;

namespace CandeeCamp.API.DomainObjects
{
    public class User : GuidId
    {
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
        
        [Required]
        public DateTimeOffset DateCreated { get; set; }

        public DateTimeOffset? LastLoggedInDate { get; set; }

        public string RefreshToken { get; set; }
    }
}