using System;

namespace AlSafeerTraders.Domain.Entities
{
    public class UserPermissionView
    {
        public int PermissionId { get; set; }
        public string PermissionKey {  get; set; }
        public int? UserId { get; set; }
        public bool IsActive { get; set; }
        public bool Allowed { get; set; }

    }
}
