using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Domain.Entities;

namespace AlSafeerTraders.Application.Mappers
{
    public class ShipmentMapper : IMapper<ShipmentDTO, Shipment>
    {
        public Shipment MapToEntity(ShipmentDTO dto)
        {
            if (dto == null)
            {
                throw new ArgumentNullException(nameof(dto));
            }

            return new Shipment
            {
                ShipmentId = dto.ShipmentId,
                ShipmentDate = dto.ShipmentDate,
                ShipmentFrom = dto.ShipmentFrom,
                ShipmentTo = dto.ShipmentTo,
                ShipmentCharges = dto.ShipmentCharges,
                PortCharges = dto.PortCharges,
                ClearanceCharges = dto.ClearanceCharges,
                MiscCharges = dto.MiscCharges,
                Notes = dto.Notes,
                ClientTypeId = dto.ClientTypeId,
                OrderId = dto.OrderId,
            };
        }

        public ShipmentDTO MapToDto(Shipment entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            return new ShipmentDTO
            {
                ShipmentId = entity.ShipmentId,
                ShipmentDate = entity.ShipmentDate,
                ShipmentFrom = entity.ShipmentFrom,
                ShipmentTo = entity.ShipmentTo,
                ShipmentCharges = entity.ShipmentCharges,
                PortCharges = entity.PortCharges,
                ClearanceCharges = entity.ClearanceCharges,
                MiscCharges = entity.MiscCharges,
                Notes = entity.Notes,
                ClientTypeId = entity.ClientTypeId,
                ClientTypeName = entity?.ClientType?.ClientTypeName,
                OrderId = entity?.OrderId,
                OrderName = entity?.Order.OrderName,
                IsActive = entity?.IsActive,
            };
        }

        public List<Shipment> MapToEntities(ShipmentDTO dto)
        {
            throw new NotImplementedException();
        }
    }
}
