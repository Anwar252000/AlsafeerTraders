using AlSafeerTraders.Application.DTOs;

namespace AlSafeerTraders.Application.Interfaces
{
    public interface IPermission
    {
        Task<List<PermissionDTO>> GetAllPermissionsAsync();
        Task<PermissionDTO> GetPermissionByIdAsync(int permissionId);
        Task<object> AddPermissionAsync(PermissionDTO dto);
        Task UpdatePermissionAsync(PermissionDTO dto);
        Task DeletePermissionAsync(int permissionId);
    }
}
