using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Domain.Entities;

namespace AlSafeerTraders.Application.Mappers
{
    public class PermissionMapper : IMapper<PermissionDTO, Permission>
    {
        public Permission MapToEntity(PermissionDTO dto)
        {
            return new Permission
            {
                PermissionId = dto.PermissionId,
                PermissionKey = dto.PermissionKey
            };
        }

        public PermissionDTO MapToDto(Permission entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            return new PermissionDTO
            {
                PermissionId = entity.PermissionId,
                PermissionKey = entity.PermissionKey,
                IsActive = entity.IsActive
            };
        }

        public List<Permission> MapToEntities(PermissionDTO dto)
        {
            throw new NotImplementedException();
        }
    }
}
