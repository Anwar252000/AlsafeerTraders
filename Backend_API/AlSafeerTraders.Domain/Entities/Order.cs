using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AlSafeerTraders.Domain.Entities
{
    public class Order
    {
        [Key]
        public int? OrderId { get; set; }
        [Required]
        public string OrderName { get; set; }
        public DateTime? OrderDate { get; set; }
        public string? OrderStatus { get; set; }
        public int? Qty { get; set; }
        public string? Weight { get; set; }

        [ForeignKey("Product")]
        public int? ProductId { get; set; }

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
        public Product? Product { get; set; }
        public Client? Client { get; set; }

    }
}
