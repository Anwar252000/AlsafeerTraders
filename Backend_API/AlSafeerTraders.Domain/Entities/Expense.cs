using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AlSafeerTraders.Domain.Entities
{
    public class Expense
    {
        [Key]
        public int? ExpenseId { get; set; }
        [Required]
        public string ExpenseType { get; set; }
        public string? Picture { get; set; }
        public int? Amount { get; set; }
        public string? Status { get; set; }

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
        public ClientType ClientType { get; set; }

    }
}
