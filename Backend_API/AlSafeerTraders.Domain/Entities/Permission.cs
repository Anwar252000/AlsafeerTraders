using System.ComponentModel.DataAnnotations;


namespace AlSafeerTraders.Domain.Entities
{
    public class Permission
    {
        [Key]
        public int PermissionId { get; set; }
        public string PermissionKey { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public int CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int? UpdatedBy { get; set; }
    }
}
