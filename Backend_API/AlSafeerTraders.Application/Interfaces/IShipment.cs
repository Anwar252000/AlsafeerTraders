using AlSafeerTraders.Application.DTOs;

namespace AlSafeerTraders.Application.Interfaces
{
    public interface IShipment
    {
        Task<List<ShipmentDTO>> GetAllShipmentsAsync();
        Task<ShipmentDTO> GetShipmentByIdAsync(int shipmentId);
        Task AddShipmentAsync(ShipmentDTO shipment);
        Task UpdateShipmentAsync(ShipmentDTO shipment);
        Task DeleteShipmentAsync(int shipmentId);
    }
}
