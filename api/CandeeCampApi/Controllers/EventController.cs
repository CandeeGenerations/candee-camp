//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using CandeeCampApi.Common;
using CandeeCampApi.Models;
//using CandeeCampApi.BackgroundHandlers;
using CandeeCampApi.DomainObjects;
using System.Web.Http;
//using System.Net.Http;
using CandeeCampApi.Repositories;
//using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using AuthorizeAttribute = System.Web.Http.AuthorizeAttribute;
using WebApiStarter1.Repositories;
using CandeeCampApi.DBObjects;
using System.Data.Entity;
using System.Collections.Generic;
//using System.Web.Http;

namespace CandeeCampApi.Controllers
{
    [RoutePrefix("api/Event")]
    public class EventController : ApiController
    {
        private static AuthContext dataContext = new AuthContext();
        private Repository<Event> _repo = null;
        

        public EventController()
        {
            _repo = new Repository<Event>(dataContext);
        }

        //[Authorize]
        [HttpPost]
        [ActionName("createEvent")] //route only needed for unique
        public async System.Threading.Tasks.Task<IHttpActionResult> PostAsync(Event userEvent)
        {

            //UserModel user = new UserModel();

            //userEvent.Id = 2;
            //userEvent.eventName = "1";
            //userEvent.eventDesc = "1";
            //string authorized = TokenTestController.Authorize();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _repo.Create(userEvent);
            IEnumerable<Event> result = null;
            //result = _repo.Filter();
            result = _repo.Filter(e => e.Id < 4);

            return Ok(result);
        }

        //[Authorize]
        [HttpPost]
        [ActionName("updateEvent")] //route only needed for unique
        public async System.Threading.Tasks.Task<IHttpActionResult> UpdateAsync(Event userEvent)
        {

            //UserModel user = new UserModel();

            //userEvent.Id = 2;
            //userEvent.eventName = "updted";
            //userEvent.eventDesc = "updted";
            //string authorized = TokenTestController.Authorize();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //_repo.Insert(userEvent);
            _repo.Edit(userEvent);
            IEnumerable<Event> result = null;
            result = _repo.Filter();

            return Ok(result);
        }

        //[Authorize]
        [HttpDelete]
        [ActionName("deleteEventById")]
        public async System.Threading.Tasks.Task<IHttpActionResult> DeleteAsync(Event userEvent)
        {

            //UserModel user = new UserModel();

            //userEvent.Id = 2;
            //userEvent.eventName = "updted";
            //userEvent.eventDesc = "updted";
            //string authorized = TokenTestController.Authorize();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //_repo.Insert(userEvent);
            _repo.Delete(userEvent.Id);
            IEnumerable<Event> result = null;
            result = _repo.Filter();

            return Ok(result);
        }
    }
}