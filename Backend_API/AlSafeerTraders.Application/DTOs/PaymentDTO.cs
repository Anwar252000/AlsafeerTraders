using System;

namespace AlSafeerTraders.Application.DTOs
{
    public class PaymentDTO
    {
        public int? PaymentId { get; set; }
        public string? PaymentType { get; set; }
        public string? Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public bool PartialPayment { get; set; }
        public int? InvoiceId { get; set; }
        public int? ClientId { get; set; }
        public string? ClientName { get; set; }
        public string? ClientTypeName { get; set; }
        public int? OrderId { get; set; }
        public string? OrderName { get; set; }
        public string? InvoiceName { get; set; }

        public bool? IsActive { get; set; }

    }
}
