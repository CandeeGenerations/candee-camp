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
    public class UserInfoController : ApiController
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
        [ActionName("getUserInfo")]
        public String Get(UserModel userInfo)
        {
            return "D";

        }



        // POST api/values
        //[HttpPost]
        ////[ActionName("userLogin")]
        //[ActionName("userLogin")]
        //public IHttpActionResult Post(LoginUser loginUser)
        //{
            
        //    UserModel user = new UserModel();

        //    user.Email = "1";
        //    user.Password = "1";
        //    //string authorized = TokenTestController.Authorize();

        //    //ServerResponse serverResponse = new ServerResponse(user);
        //    return Ok(user);
        //}

        
    }
}