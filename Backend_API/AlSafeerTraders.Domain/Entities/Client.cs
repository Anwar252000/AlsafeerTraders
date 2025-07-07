using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AlSafeerTraders.Domain.Entities
{
    public class Client
    {
        [Key]
        public int? ClientId { get; set; }

        [ForeignKey("ClientType")]
        public int? ClientTypeId { get; set; }

        [Required]
        public string ClientName { get; set; }

        [Required]
        public string ClientAddress { get; set; }

        [Required]
        public string ClientPhoneNumber { get; set; }

        public string? ClientEmail { get; set; }

        [Required]
        public string ClientCellNumber { get; set; }

        public string? ClientFax { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public int CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int? UpdatedBy { get; set; }

        // Navigation properties
        public ClientType? ClientType { get; set; }

    }
}
