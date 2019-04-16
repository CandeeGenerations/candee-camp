using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using CandeeCampApi.Common;

namespace CandeeCampApi.DomainObjects
{
    public class User : GuidId
    {
        public User()
        {
            //UserRoles = new List<UserRole>();
           
        }

       // [Required]
        public string FirstName { get; set; }
        //[Required]
        public string LastName { get; set; }
        //[Required]
        public string Username { get; set; }
       // [Required, EmailAddress]
        public string Email { get; set; }
        
        public string PasswordHash { get; set; }
        public string Salt { get; set; }
        public DateTimeOffset DateCreated { get; set; }
        public DateTimeOffset? LastLoggedInDate { get; set; }
        
        public virtual IList<UserRole> UserRoles { get; set; }
        
    }
}