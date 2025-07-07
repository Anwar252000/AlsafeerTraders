using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AlSafeerTraders.Domain.Entities
{
    public class Payment
    {
        [Key]
        public int? PaymentId { get; set; }
        [Required]
        public string PaymentType { get; set; }
        public string? Amount { get; set; }

        public DateTime PaymentDate { get; set; }
       
        [Required]
        public bool PartialPayment { get; set; }

        [ForeignKey("Invoice")]
        public int? InvoiceId { get; set; }

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
        public Invoice? Invoice { get; set; }
        public Order? Order { get; set; }

    }
}
