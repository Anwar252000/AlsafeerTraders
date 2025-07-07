
namespace AlSafeerTraders.Application.DTOs
{
    public class InvoiceDTO
    {
        public int? InvoiceId { get; set; }
        public string? InvoiceName { get; set; }
        public DateTime? InvoiceDate { get; set; }
        public int? InvoiceAmount { get; set; }
        public int? OrderId { get; set; }
        public string? OrderName { get; set; }
        public int? ClientId { get; set; }
        public string? ClientName { get; set; }
        public string? ClientTypeName { get; set;}

        public bool? IsActive { get; set; }

    }
}
