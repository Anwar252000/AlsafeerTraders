using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AlSafeerTraders.Domain.Entities
{
    public class Product
    {
        [Key]
        public int? ProductId { get; set; }
        [Required]
        public string ProductName { get; set; }
        public string? Picture { get; set; }

        public int? QtyInHand { get; set; }
        [Required]
        public bool IsActive { get; set; }
        [Required]
        public int CreatedBy { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int? UpdatedBy { get; set; }

    }
}
