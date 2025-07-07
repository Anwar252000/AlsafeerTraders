using System.ComponentModel.DataAnnotations;

namespace AlSafeerTraders.Domain.Entities
{
    public class UserRole
    {
        [Key]
        public int? RoleId { get; set; }

        [Required]
        [StringLength(50)]
        public string RoleName { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public int CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public int? UpdatedBy { get; set; }

        [Required]
        public bool IsActive { get; set; }

    }
}
