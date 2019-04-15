using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApiStarter1.Database;

namespace CandeeCampApi.Models
{
    public class Person : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
    }
}