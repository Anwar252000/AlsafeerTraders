

namespace AlSafeerTraders.Application.DTOs
{
    public class AddUserPermissionDTO
    {
        public int UserId { get; set; }
        public List<int> PermissionIds { get; set; } = new List<int>();

    }
}
