namespace CandeeCampApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new2 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Events",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        eventName = c.String(unicode: false),
                        eventDesc = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.AspNetUsers", "Discriminator", c => c.String(nullable: false, maxLength: 128, storeType: "nvarchar"));
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "Discriminator");
            DropTable("dbo.Events");
        }
    }
}
