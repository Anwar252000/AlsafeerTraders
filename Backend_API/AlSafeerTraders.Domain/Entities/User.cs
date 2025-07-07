using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace AlSafeerTraders.Domain.Entities
{
    public class User
    {
        [Key]
        public int? UserId { get; set; }

        [ForeignKey("UserRole")]
        public int? RoleId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }
        [Required]
        public int CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public int? UpdatedBy { get; set; }

        // Navigation properties
        public UserRole? UserRole { get; set; }
    }
}
