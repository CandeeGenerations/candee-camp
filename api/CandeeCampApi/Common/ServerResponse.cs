using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CandeeCampApi.Models;

namespace CandeeCampApi.Common
{
    public class ServerResponse
    {
        public string invalidation;
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }

        public ServerResponse()
        {
            invalidation = "Invalid Username/Password";
        }

        public ServerResponse(UserModel userModel)
        {
            //Email = userModel.Email;
            //FirstName = userModel.FirstName;
            //LastName = userModel.LastName;
            //Password = userModel.Password;
            //Username = userModel.Username;
        }



        //public string Email { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        //public string FirstName { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        //public string LastName { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        //public string Password { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        //public string Username { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    }
}