

namespace AlSafeerTraders.Application.DTOs
{
    public class UserPermissionDTO
    {
        public int UserPermissionId { get; set; }
        public int UserId { get; set; }
        public List<int> PermissionIds { get; set; } = new List<int>();
        public int PermissionId { get; set; }
        public string PermissionKey { get; set; }

    }
}
