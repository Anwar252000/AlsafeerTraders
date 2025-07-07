
namespace AlSafeerTraders.Application.DTOs
{
    public class ResetPasswordDTO
    {
        public int? UserId { get; set; }
        public string? OldPassword { get; set; }
        public string? NewPassword { get; set; }
    }
}
