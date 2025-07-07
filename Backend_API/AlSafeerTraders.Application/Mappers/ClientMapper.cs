using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Domain.Entities;

namespace AlSafeerTraders.Application.Mappers
{
    public class ClientMapper : IMapper<ClientDTO, Client>
    {
        public Client MapToEntity(ClientDTO dto)
        {
            return new Client
            {
                ClientId = dto.ClientId,
                ClientTypeId = dto.ClientTypeId,
                ClientName = dto.ClientName,
                ClientAddress = dto.ClientAddress,
                ClientPhoneNumber = dto.ClientPhoneNumber,
                ClientEmail = dto.ClientEmail,
                ClientCellNumber = dto.ClientCellNumber,
                ClientFax = dto.ClientFax,
            };
        }
        public ClientDTO MapToDto(Client entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            return new ClientDTO
            {
                ClientId = entity.ClientId,
                ClientTypeId = entity.ClientTypeId,
                ClientName = entity.ClientName,
                ClientAddress = entity.ClientAddress,
                ClientPhoneNumber = entity.ClientPhoneNumber,
                ClientEmail = entity.ClientEmail,
                ClientCellNumber = entity.ClientCellNumber,
                ClientFax = entity.ClientFax,
                ClientTypeName = entity?.ClientType?.ClientTypeName,
                IsActive = entity?.IsActive,
            };
        }

        public List<Client> MapToEntities(ClientDTO dto)
        {
            throw new NotImplementedException();
        }

    }
}
