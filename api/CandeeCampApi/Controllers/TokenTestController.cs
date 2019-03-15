using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace CandeeCampApi.Controllers
{
    public class TokenTestController : ApiController
    {
        [Authorize]
        public IHttpActionResult Authorize()
        {
            return Ok("Authorized");
        }
    }
}