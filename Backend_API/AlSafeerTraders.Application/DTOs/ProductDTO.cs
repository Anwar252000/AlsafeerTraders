
using Microsoft.AspNetCore.Http;

namespace AlSafeerTraders.Application.DTOs
{
    public class ProductDTO
    {
        public int? ProductId { get; set; }
        public string? ProductName { get; set; }
        public IFormFile? PictureFile { get; set; }
        public string? Picture { get; set; }
        public int? QtyInHand { get; set; }

        public bool? IsActive { get; set; }
    }
}
