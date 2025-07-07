namespace AlSafeerTraders.Application.DTOs
{
    public class OrderDTO
    {
        public int? OrderId { get; set; }
        public string? OrderName { get; set; }
        public DateTime? OrderDate { get; set; }
        public string? OrderStatus { get; set; }
        public int? Qty { get; set; }
        public string? Weight { get; set; }
        public int? ProductId { get; set; }
        public string? ProductName { get; set; }
        public int? ClientId { get; set; }
        public string? ClientName { get; set; }
        public string? ClientTypeName { get; set;}

        public bool? IsActive { get; set; }

    }
}
