using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Application.Helpers;
using AlSafeerTraders.Application.Interfaces;
using AlSafeerTraders.Application.Mappers;
using AlSafeerTraders.Domain.Entities;
using AlSafeerTraders.Domain.Interface;
using Microsoft.EntityFrameworkCore;


namespace AlSafeerTraders.Application.Services
{
    public class ShipmentService : IShipment
    {
        private readonly IGenericRepository<Shipment> _shipmentRepository;
        private readonly ShipmentMapper _mapper;
        private readonly ClaimsHelper _claimsHelper;
        public ShipmentService(IGenericRepository<Shipment> shipmentRepository, ShipmentMapper mapper, ClaimsHelper claimsHelper)
        {
            _shipmentRepository = shipmentRepository;
            _mapper = mapper;
            _claimsHelper = claimsHelper;
        }

        public async Task AddShipmentAsync(ShipmentDTO dto)
        {
            try
            {
                var shipmentEntity = _mapper.MapToEntity(dto);
                shipmentEntity.IsActive = true;
                shipmentEntity.CreatedAt = DateTime.Now;
                shipmentEntity.CreatedBy = _claimsHelper.GetUserIdFromClaims();
                await _shipmentRepository.AddAsync(shipmentEntity);
            }
            catch (Exception ex)
            {
                throw new Exception("Error adding shipment", ex);
            }
        }

        public async Task<List<ShipmentDTO>> GetAllShipmentsAsync()
        {
            var shipments = await _shipmentRepository.GetAllAsync(include: query => query
                .Include(x => x.ClientType)
                .Include(x=>x.Order));
            //var activeShipments = shipments.Where(s => s.IsActive);
            var shipmentDtos = shipments.Select(s => _mapper.MapToDto(s)).ToList();
            return shipmentDtos;
        }

        public async Task<ShipmentDTO> GetShipmentByIdAsync(int shipmentId)
        {
            //var shipment = await _shipmentRepository.GetByIdAsync(shipmentId);
            var shipments = await _shipmentRepository.GetAllAsync(
            filter: s => s.ShipmentId == shipmentId,
            include: query => query
            .Include(s => s.ClientType)
            .Include(x => x.Order)
             );

            var shipment = shipments.FirstOrDefault();

            return shipment != null && shipment.IsActive ? _mapper.MapToDto(shipment) : null;
        }

        public async Task UpdateShipmentAsync(ShipmentDTO shipmentDto)
        {
            try
            {
                var shipmentEntity = _mapper.MapToEntity(shipmentDto);
                shipmentEntity.IsActive = true;
                shipmentEntity.UpdatedAt = DateTime.Now;
                shipmentEntity.UpdatedBy = _claimsHelper.GetUserIdFromClaims();
                await _shipmentRepository.UpdateAsync(shipmentEntity);
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating shipment", ex);
            }
        }

        public async Task DeleteShipmentAsync(int shipmentId)
        {
            var shipment = await _shipmentRepository.GetByIdAsync(shipmentId);
            if (shipment != null)
            {
                shipment.IsActive = !shipment.IsActive;
                await _shipmentRepository.UpdateAsync(shipment);
            }
            else
            {
                throw new Exception("Shipment not found.");
            }
        }
    }
}
