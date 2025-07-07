using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Application.Helpers;
using AlSafeerTraders.Application.Interfaces;
using AlSafeerTraders.Application.Mappers;
using AlSafeerTraders.Domain.Entities;
using AlSafeerTraders.Domain.Interface;


namespace AlSafeerTraders.Application.Services
{
    public class ClientTypeService : IClientType
    {
        private readonly IGenericRepository<ClientType> _clientTypeRepository;
        private readonly ClientTypeMapper _mapper;
        private readonly ClaimsHelper _claimsHelper;

        public ClientTypeService(IGenericRepository<ClientType> clientTypeRepository, ClientTypeMapper mapper, ClaimsHelper claimsHelper)
        {
            _clientTypeRepository = clientTypeRepository;
            _mapper = mapper;
            _claimsHelper = claimsHelper;
        }

        public async Task AddClientTypeAsync(ClientTypeDTO dto)
        {
            try
            {
                var clientTypeEntity = _mapper.MapToEntity(dto);
                clientTypeEntity.IsActive = true;
                clientTypeEntity.CreatedAt = DateTime.Now;
                clientTypeEntity.CreatedBy = _claimsHelper.GetUserIdFromClaims();
                await _clientTypeRepository.AddAsync(clientTypeEntity);
            }
            catch (Exception ex)
            {
                throw new Exception("Error adding client type", ex);
            }
        }

        public async Task<List<ClientTypeDTO>> GetAllClientTypeAsync()
        {
            var clientTypes = await _clientTypeRepository.GetAllAsync();
            //var activeClientTypes = clientTypes.Where(ct => ct.IsActive);
            var clientTypeDtos = clientTypes.Select(ct => _mapper.MapToDto(ct)).ToList();
            return clientTypeDtos;
        }

        public async Task<ClientTypeDTO> GetClientTypeByIdAsync(int clientTypeId)
        {
            var clientType = await _clientTypeRepository.GetByIdAsync(clientTypeId);
            return clientType != null && clientType.IsActive ? _mapper.MapToDto(clientType) : null;
        }

        public async Task UpdateClientTypeAsync(ClientTypeDTO clientTypeDto)
        {
            try
            {
                var clientTypeEntity = _mapper.MapToEntity(clientTypeDto);
                clientTypeEntity.IsActive = true;
                clientTypeEntity.UpdatedAt = DateTime.Now;
                clientTypeEntity.UpdatedBy = _claimsHelper.GetUserIdFromClaims();
                await _clientTypeRepository.UpdateAsync(clientTypeEntity);
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating client type", ex);
            }
        }

        public async Task DeleteClientTypeAsync(int clientTypeId)
        {
            var clientType = await _clientTypeRepository.GetByIdAsync(clientTypeId);
            if (clientType != null)
            {
                clientType.IsActive = !clientType.IsActive;
                await _clientTypeRepository.UpdateAsync(clientType);
            }
            else
            {
                throw new Exception("Client Type not found.");
            }
        }
    }
}
