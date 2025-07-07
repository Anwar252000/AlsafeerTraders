using System.ComponentModel.DataAnnotations;


namespace AlSafeerTraders.Domain.Entities
{
    public class RefreshToken
    {
        [Required]
        public string Token { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime Expires { get; set; }
    }
}
