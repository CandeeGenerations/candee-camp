using System;
using System.ComponentModel.DataAnnotations;

namespace CandeeCamp.API.Models
{
    [Serializable]
    public class AuthenticationModel
    {
        public string username { get; set; }
        
        public string password { get; set; }

        [Required]
        public string grant_type { get; set; }

        public string refresh_token { get; set; }
    }
}