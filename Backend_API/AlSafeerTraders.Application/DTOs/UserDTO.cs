
namespace AlSafeerTraders.Application.DTOs
{
    public class UserDTO
    {
        public int? UserId { get; set; }
        public int? RoleId { get; set; }
        public string? Name { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? RoleName { get; set; }

        public bool? IsActive { get; set; }

    }
}
