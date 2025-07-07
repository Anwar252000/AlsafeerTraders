using AlSafeerTraders.Application.DTOs;

namespace AlSafeerTraders.Application.Interfaces
{
    public interface IUserPermission
    {
        Task<List<UserPermissionDTO>> GetAllUserPermissionsAsync();
        Task<List<UserPermissionViewDTO>> GetUserPermissionAsync(int userId);
        Task<UserPermissionDTO> GetUserPermissionByIdAsync(int userPermissionId);
        Task<object> AddUserPermissionAsync(AddUserPermissionDTO dto);
        Task UpdateUserPermissionAsync(UserPermissionDTO user);
        Task DeleteUserPermissionAsync(int userPermissionId);
    }
}
