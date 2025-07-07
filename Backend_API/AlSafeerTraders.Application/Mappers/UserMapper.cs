using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Domain.Entities;

namespace AlSafeerTraders.Application.Mappers
{
    public class UserMapper : IMapper<UserDTO, User>
    {
        public User MapToEntity(UserDTO dto)
        {
            return new User
            {
                UserId = dto.UserId,
                RoleId = dto.RoleId,
                Name = dto.Name,
                Username = dto.Username,
                Password = dto.Password,
            };
        }

        public UserDTO MapToDto(User entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            return new UserDTO
            {
                UserId = entity.UserId,
                RoleId = entity.RoleId,
                Name = entity.Name,
                Username = entity.Username,
                Password = entity.Password,
                RoleName = entity.UserRole.RoleName,
                IsActive = entity.IsActive,
            };
        }

        public List<User> MapToEntities(UserDTO dto)
        {
            throw new NotImplementedException();
        }
    }
}
