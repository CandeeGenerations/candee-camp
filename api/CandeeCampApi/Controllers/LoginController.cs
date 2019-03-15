using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
using CandeeCampApi.Common;
using CandeeCampApi.Models;
using CandeeCampApi.BackgroundHandlers;
using CandeeCampApi.DomainObjects;
using System.Web.Http;
using System.Net.Http;
//using System.Web.Http;

namespace CandeeCampApi.Controllers
{
    //[Authorize]
    //[Route("api/Login")]
    public class LoginController : ApiController
    {
        // GET api/values
        //[HttpGet("{getUserInfo}")]
        //[Route("api/[controller]/getUserInfo")]
        // public IEnumerable<string> Get()
        // {
        //     return new string[] { "value1", "value2" };
        // }

        //GET api/values/5
        [HttpGet]
        [ActionName("userLogin")]
        public String Get(UserModel userInfo)
        {
            return "D";

        }



        // POST api/values
        [HttpPost]
        //[ActionName("userLogin")]
        [ActionName("userLogin")]
        public IHttpActionResult Post(LoginUser loginUser)
        {
            
            UserModel user = new UserModel();

            user.Email = "1";
            user.Password = "1";
            //string authorized = TokenTestController.Authorize();

            //ServerResponse serverResponse = new ServerResponse(user);
            return Ok(user);
        }

        //// PUT api/values/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/values/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //    EmailService email = new EmailService();
        //}

        //Verify user and come back with all user data, not just email and password
        //private ServerResponse verifyUser(UserModel userInfo)
        //{
            //if (userInfo.Email == "songofthevoid@.com" && userInfo.Password == "yo") //SUDO code pretending the SQL data for user has been returned. Change later
            //{
            //    UserModel verifiedUser = new UserModel();
            //    verifiedUser.FirstName = "FName";
            //    verifiedUser.LastName = "LName";
            //    verifiedUser.Username = "UName";
            //    verifiedUser.Email = "Email";
            //    verifiedUser.Password = "Passw";
            //    ServerResponse serverResponse = new ServerResponse(verifiedUser);

            //    String userName = "1@1.com";
            //    int index = userName.IndexOf("@");
            //    if (index > 0)
            //        userName = userName.Substring(0, index);

            //    return serverResponse;
            //}
            //else
            //{
            //    ServerResponse serverResponse = new ServerResponse();
            //    return serverResponse;
            //}
        //}

        //private bool verifyLogin(String userInfo)
        //{
        //    bool verification = false;

        //    DBConnect connection = new DBConnect();
        //    try
        //    {
        //        connection.Select("SELECT * FROM darklordpaladin_candeecamp.USERS WHERE USERNAME LIKE ? AND PASSWORD LIKE ?;", new string[] { "songofthevoid", "r0salina"});
        //        connection.
        //    }
        //    catch (Exception ex)
        //    {

        //    }
        //    return verification;
        //}
    }
}