using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Domain.Entities;

namespace AlSafeerTraders.Application.Mappers
{
    public class UserRoleMapper : IMapper<UserRoleDTO, UserRole>
    {
        public UserRole MapToEntity(UserRoleDTO dto)
        {
            if (dto == null)
            {
                throw new ArgumentNullException(nameof(dto));
            }

            return new UserRole
            {
                RoleId = dto.RoleId,
                RoleName = dto.RoleName,
            };
        }

        public UserRoleDTO MapToDto(UserRole entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            return new UserRoleDTO
            {
                RoleId = entity.RoleId,
                RoleName = entity.RoleName,
            };
        }

        public List<UserRole> MapToEntities(UserRoleDTO dto)
        {
            throw new NotImplementedException();
        }
    }
}
