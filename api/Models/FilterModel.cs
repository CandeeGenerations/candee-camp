using System;

namespace Reclaimed.API.Models
{
    public class FilterModel
    {
        public string Name { get; set; }
    }

    public class ActiveFilterModel : FilterModel
    {
        public bool? IsActive { get; set; }
    }

    public class EventFilterModel : FilterModel
    {
        public int? CostStart { get; set; }

        public int? CostEnd { get; set; }

        public bool? OnGoing { get; set; }

        public DateTimeOffset? DateStart { get; set; }

        public DateTimeOffset? DateEnd { get; set; }
    }

    public class CamperFilterModel : ActiveFilterModel
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTimeOffset? BirthdateStart { get; set; }
        
        public DateTimeOffset? BirthdateEnd { get; set; }

        public string ParentsName { get; set; }

        public bool? HasMedication { get; set; }

        public bool? HasAllergies { get; set; }

        public int? BalanceStart { get; set; }

        public int? BalanceEnd { get; set; }
    }
}
