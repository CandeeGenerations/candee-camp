using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApiStarter1.Database;

namespace CandeeCampApi.Models
{
    public class Event : IEntity
    {
        public int Id { get; set; }
        public string eventName { get; set; }
        public string eventDesc { get; set; }


    }



}