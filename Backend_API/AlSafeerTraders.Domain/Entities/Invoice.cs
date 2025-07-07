using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AlSafeerTraders.Domain.Entities
{
    public class Invoice
    {
        [Key]
        public int? InvoiceId { get; set; }
        [Required]
        public string InvoiceName { get; set; }
        public DateTime? InvoiceDate { get; set; }
        public int? InvoiceAmount { get; set; }

        [ForeignKey("Order")]
        public int? OrderId { get; set; }

        [ForeignKey("Client")]
        public int? ClientId { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public int CreatedBy { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int? UpdatedBy { get; set; }

        // Navigation properties
        public Client? Client { get; set; }
        public Order? Order { get; set; }

    }
}
