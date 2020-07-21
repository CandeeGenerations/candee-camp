using System;

namespace Reclaimed.API.Models
{
    public class FilterModel
    {
        public string Name { get; set; }
    }

    public class EventFilterModel : FilterModel
    {
        public int? CostStart { get; set; }

        public int? CostEnd { get; set; }

        public bool? OnGoing { get; set; }

        public DateTimeOffset? DateStart { get; set; }

        public DateTimeOffset? DateEnd { get; set; }
    }
}
