using CandeeCamp.Core.Domain.Common;
using CandeeCamp.Core.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace CandeeCamp.Core.Api.Controllers
{
    [Route("api/[controller]")]
    public class LoginController
    {
        // GET api/values
        //[HttpGet("{getUserInfo}")]
        //[Route("api/[controller]/getUserInfo")]
       // public IEnumerable<string> Get()
       // {
       //     return new string[] { "value1", "value2" };
       // }

        // GET api/values/5
        [HttpGet]
        //[Route("api/[controller]/userLogin")]
        public ServerResponse Get(UserModel userInfo)
        {
            return verifyUser(userInfo);
            
        }

        

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        //Verify user and come back with all user data, not just email and password
        private ServerResponse verifyUser(UserModel userInfo)
        {
            if (userInfo.Email == "1@1.com" && userInfo.Password == "yo") //SUDO code pretending the SQL data for user has been returned. Change later
            {
                UserModel verifiedUser = new UserModel();
                verifiedUser.FirstName = "FName";
                verifiedUser.LastName = "LName";
                verifiedUser.Username = "UName";
                verifiedUser.Email = "Email";
                verifiedUser.Password = "Passw";
                ServerResponse serverResponse = new ServerResponse(verifiedUser);
                return serverResponse;
            }
            else
            {
                ServerResponse serverResponse = new ServerResponse();
                return serverResponse;
            }
        }
    }
}
