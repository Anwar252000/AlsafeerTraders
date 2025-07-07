using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Domain.Entities;

namespace AlSafeerTraders.Application.Mappers
{
    public class UserPermissionMapper : IMapper<UserPermissionDTO, UserPermission>
    {
        public UserPermission MapToEntity(UserPermissionDTO dto)
        {
            return new UserPermission
            {
                UserPermissionId = dto.UserPermissionId,
                UserId = dto.UserId,
                PermissionId = dto.PermissionIds.FirstOrDefault(),
            };
        }

        public List<UserPermission> MapToEntities(UserPermissionDTO dto)
        {
            var models = new List<UserPermission>();

            foreach (var permissionId in dto.PermissionIds)
            {
                models.Add(new UserPermission
                {
                    UserPermissionId = dto.UserPermissionId,
                    UserId = dto.UserId,
                    PermissionId = permissionId,
                });
            }

            return models;
        }

        public UserPermissionDTO MapToDto(UserPermission entity)
        {
            return new UserPermissionDTO
            {
                UserPermissionId = entity.UserPermissionId,
                UserId = entity.UserId,
                PermissionIds = entity.PermissionId.HasValue ? new List<int> { entity.PermissionId.Value } : new List<int>(),
                PermissionId = entity.Permissions.PermissionId,
                PermissionKey = entity.Permissions.PermissionKey,
            };
        }
    }
}
