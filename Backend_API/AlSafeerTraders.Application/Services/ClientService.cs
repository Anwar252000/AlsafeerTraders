using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Application.Helpers;
using AlSafeerTraders.Application.Interfaces;
using AlSafeerTraders.Application.Mappers;
using AlSafeerTraders.Domain.Entities;
using AlSafeerTraders.Domain.Interface;
using Microsoft.EntityFrameworkCore;

namespace AlSafeerTraders.Application.Services
{
    public class ClientService : IClient
    {
        private readonly IGenericRepository<Client> _clientRepository;
        private readonly ClientMapper _mapper;
        private readonly ClaimsHelper _claimsHelper;

        public ClientService(IGenericRepository<Client> clientRepository, ClientMapper mapper, ClaimsHelper claimsHelper)
        {
            _clientRepository = clientRepository;
            _mapper = mapper;
            _claimsHelper = claimsHelper;
        }

        public async Task AddClientAsync(ClientDTO dto)
        {
            try
            {
                var clientEntity = _mapper.MapToEntity(dto);
                clientEntity.IsActive = true;
                clientEntity.CreatedAt = DateTime.Now;
                clientEntity.CreatedBy = _claimsHelper.GetUserIdFromClaims();
                await _clientRepository.AddAsync(clientEntity);
            }
            catch (Exception ex)
            {
                throw new Exception("Error adding client", ex);
            }
        }

        public async Task<List<ClientDTO>> GetAllClientsAsync()
        {
            var clients = await _clientRepository.GetAllAsync(include: query => query
                .Include(x => x.ClientType));
            //var activeClients = clients.Where(c => c.IsActive);
            var clientDtos = clients.Select(c => _mapper.MapToDto(c)).ToList();
            return clientDtos;
        }

        public async Task<ClientDTO> GetClientByIdAsync(int clientId)
        {
            var client = await _clientRepository.GetByIdAsync(clientId);
            return client != null && client.IsActive ? _mapper.MapToDto(client) : null;
        }

        public async Task UpdateClientAsync(ClientDTO clientDto)
        {
            try
            {
                var clientEntity = _mapper.MapToEntity(clientDto);
                clientEntity.IsActive = true;
                clientEntity.UpdatedAt = DateTime.Now;
                clientEntity.UpdatedBy = _claimsHelper.GetUserIdFromClaims();
                await _clientRepository.UpdateAsync(clientEntity);
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating client", ex);
            }
        }

        public async Task DeleteClientAsync(int clientId)
        {
            var client = await _clientRepository.GetByIdAsync(clientId);
            if (client != null)
            {
                client.IsActive = !client.IsActive;
                await _clientRepository.UpdateAsync(client);
            }
            else
            {
                throw new Exception("Client not found.");
            }
        }
    }
}
