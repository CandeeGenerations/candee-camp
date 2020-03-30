namespace Reclaimed.API.DomainObjects.Common
{
    public class ActiveDeleted : PrimaryId
    {
        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }
    }
}