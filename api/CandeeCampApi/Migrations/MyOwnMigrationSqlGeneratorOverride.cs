using MySql.Data.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CandeeCampApi.Migrations
{
    public class MyOwnMigrationSqlGeneratorOverride : MySqlMigrationSqlGenerator
    {
        public string Engine { get; set; }

        public MyOwnMigrationSqlGeneratorOverride()
        {
            Engine = "MYISAM";
        }

        //public MyOwnMigrationSqlGenerator(string engine)
        //{
        //    Engine = engine;
        //}
    }
}