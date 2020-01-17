using System.Collections.Generic;

namespace CandeeCamp.API.Models
{
    public class CamperOverrideModel : CamperModel
    {
        public string Coupon { get; set; }

        public int? PaymentId { get; set; }
    }

    public class RegisterGroupModel
    {
        public string GroupName { get; set; }

        public IEnumerable<CamperOverrideModel> Campers { get; set; }

        public int? PaymentId { get; set; }
    }
}