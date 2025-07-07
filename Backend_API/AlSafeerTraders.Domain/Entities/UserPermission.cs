using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AlSafeerTraders.Domain.Entities
{
    public class UserPermission
    {
        [Key]
        public int UserPermissionId { get; set; }

        [ForeignKey("Users")]
        public int UserId {  get; set; }

        [ForeignKey("Permissions")]
        public int? PermissionId { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public int CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int? UpdatedBy { get; set; }

        //Navigation Properties
        public User? Users { get; set; }
        public Permission? Permissions { get; set; }
    }
}
