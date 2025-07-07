using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Application.Mappers;
using AlSafeerTraders.Domain.Entities;

namespace AlSafeerTraders.Application.Mappers
{
    public class ClientTypeMapper : IMapper<ClientTypeDTO, ClientType>
    {
        public ClientType MapToEntity(ClientTypeDTO dto)
        {

            return new ClientType
            {
                ClientTypeId = dto.ClientTypeId,
                ClientTypeName = dto.ClientTypeName,
            };
        }

        public ClientTypeDTO MapToDto(ClientType entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            return new ClientTypeDTO
            {
                ClientTypeId = entity.ClientTypeId,
                ClientTypeName = entity.ClientTypeName,
                IsActive = entity.IsActive,
            };
        }

        public List<ClientType> MapToEntities(ClientTypeDTO dto)
        {
            throw new NotImplementedException();
        }
    }
}
