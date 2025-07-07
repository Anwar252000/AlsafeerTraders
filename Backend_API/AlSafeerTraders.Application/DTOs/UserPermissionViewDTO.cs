

namespace AlSafeerTraders.Application.DTOs
{
    public class UserPermissionViewDTO
    {
        public int PermissionId { get; set; }
        public string PermissionKey { get; set; }
        public bool IsActive { get; set; }
        public int? UserId { get; set; }
        public bool Allowed { get; set; }

    }
}
