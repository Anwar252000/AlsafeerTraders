using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Domain.Entities;

namespace AlSafeerTraders.Application.Mappers
{
    public class UserPermissionViewMapper : IMapper<UserPermissionViewDTO, UserPermissionView>
    {
        public UserPermissionView MapToEntity(UserPermissionViewDTO dto)
        {
           throw new NotImplementedException();
        }

        public List<UserPermissionView> MapToEntities(UserPermissionViewDTO dto)
        {
           throw new NotImplementedException();

        }

        public UserPermissionViewDTO MapToDto(UserPermissionView entity)
        {
            return new UserPermissionViewDTO
            {
                PermissionId = entity.PermissionId,
                UserId = entity?.UserId,
                PermissionKey = entity.PermissionKey,
                IsActive = entity.IsActive,
                Allowed = entity.Allowed,
            };
        }
    }
}
