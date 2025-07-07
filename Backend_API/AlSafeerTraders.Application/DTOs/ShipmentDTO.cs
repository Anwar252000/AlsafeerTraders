


namespace AlSafeerTraders.Application.DTOs
{
    public class ShipmentDTO
    {
        public int? ShipmentId { get; set; }
        public DateTime? ShipmentDate { get; set; }
        public string? ShipmentFrom { get; set; }
        public string? ShipmentTo { get; set; }
        public int? ShipmentCharges { get; set; }
        public int? PortCharges { get; set; }
        public int? ClearanceCharges { get; set; }
        public int? MiscCharges { get; set; }
        public string? Notes { get; set; }
        public int? ClientTypeId { get; set; }
        public string? ClientTypeName { get; set; }
        public int? OrderId { get; set; }
        public string? OrderName { get; set; }

        public bool? IsActive { get; set; }

    }
}
