
namespace AlSafeerTraders.Application.DTOs
{
    public class ClientDTO
    {
        public int? ClientId { get; set; }
        public int? ClientTypeId { get; set; }
        public string? ClientName { get; set; }
        public string? ClientAddress { get; set; }
        public string? ClientPhoneNumber { get; set; }
        public string? ClientEmail { get; set; }
        public string? ClientCellNumber { get; set; }
        public string? ClientFax { get; set; }
        public string? ClientTypeName { get; set; }
        public bool? IsActive { get; set; }
    }
}
