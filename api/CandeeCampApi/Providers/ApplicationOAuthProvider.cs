//using Microsoft.Owin.Security.OAuth;
//using Microsoft.Owin;
//using Microsoft.Aspnet.Identity.Owin;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Security.Claims;
//using System.Web;

//namespace WebApiStarter1.Providers
//{
//    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
//    {
//        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
//        {
//            context.Validated();
//        }

//        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
//        {
//            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

//            if (context.UserName != context.Password)
//            {
//                context.SetError("invalid_grant", "The user name or password is incorrect.");
//                return;
//            }

//            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
//            identity.AddClaim(new Claim("sub", context.UserName));
//            identity.AddClaim(new Claim(ClaimTypes.Role, "user"));

//            context.Validated(identity);

//        }
//    }
//}