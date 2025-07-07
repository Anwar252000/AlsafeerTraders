
using Microsoft.AspNetCore.Http;

namespace AlSafeerTraders.Application.DTOs
{
    public class ExpenseDTO
    {
        public int? ExpenseId { get; set; }
        public string? ExpenseType { get; set; }
        public IFormFile? PictureFile { get; set; }
        public string? Picture { get; set; }
        public int? Amount { get; set; }
        public string? Status { get; set; }
        public int? ClientTypeId { get; set; }
        public string? ClientTypeName { get; set; }

        public bool? IsActive { get; set; }

    }
}
