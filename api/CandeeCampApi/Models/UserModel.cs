using Microsoft.AspNet.Identity.EntityFramework;
using System.ComponentModel.DataAnnotations;

namespace CandeeCampApi.Models
{
    public class UserModel //: IdentityUser//, Microsoft.AspNet.Identity.IUser //: IUserModel
    {
        ////[Required]
        //public string FirstName { get; set; }
        ////[Required]
        //public string LastName { get; set; }
        ////[Required]
        //public string Username { get; set; }
        [Required] //[Required, EmailAddress]
        [Display(Name = "User Name")]
        public string UserName { get; set; }

        [Required] //[Required, EmailAddress]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        [DataType(DataType.EmailAddress)]
        [Display(Name = "Email Address")]
        public string Email { get; set; }

        //public string Id => throw new System.NotImplementedException();
        //[Required]
        //public string Password { get; set; }
    }
}