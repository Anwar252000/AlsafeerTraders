using AlSafeerTraders.Application.DTOs;

namespace AlSafeerTraders.Application.Interfaces
{
    public interface IUserRole
    {
        Task<List<UserRoleDTO>> GetAllUserRolesAsync();
        Task<UserRoleDTO> GetUserRoleByIdAsync(int userRoleId);
        Task AddUserRoleAsync(UserRoleDTO userRole);
        Task UpdateUserRoleAsync(UserRoleDTO userRole);
        Task DeleteUserRoleAsync(int userRoleId);
    }
}
