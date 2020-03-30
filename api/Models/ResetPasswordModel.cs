namespace Reclaimed.API.Models
{
    public class ResetPasswordModel
    {
        public int UserId { get; set; }

        public string Token { get; set; }

        public string Password { get; set; }
    }
}