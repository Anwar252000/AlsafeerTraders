using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace AlSafeerTraders.Domain.Entities
{
    public class ClientType
    {
        [Key]
        public int? ClientTypeId { get; set; }
        public string? ClientTypeName { get; set; }

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
