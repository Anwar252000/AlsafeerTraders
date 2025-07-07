using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AlSafeerTraders.Domain.Entities
{
    public class Shipment
    {
        [Key]
        public int? ShipmentId { get; set; }
        public DateTime? ShipmentDate { get; set; }
        public string? ShipmentFrom { get; set; }
        public string? ShipmentTo { get; set; }
        public int? ShipmentCharges { get; set; }
        public int? PortCharges { get; set; }
        public int? ClearanceCharges { get; set; }
        public int? MiscCharges { get; set; }
        public string? Notes { get; set; }

        [ForeignKey("Order")]
        public int? OrderId { get; set; }

        [ForeignKey("ClientType")]
        public int? ClientTypeId { get; set; }

        [Required]
        public bool IsActive { get; set; }
        [Required]
        public int CreatedBy { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int? UpdatedBy { get; set; }

        // Navigation properties
        public ClientType? ClientType { get; set; }
        public Order? Order { get; set; }

    }
}
