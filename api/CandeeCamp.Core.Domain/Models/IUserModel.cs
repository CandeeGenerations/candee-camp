namespace CandeeCamp.Core.Domain.Models
{
    public interface IUserModel
    {
        string Email { get; set; }
        string FirstName { get; set; }
        string LastName { get; set; }
        string Password { get; set; }
        string Username { get; set; }
    }
}