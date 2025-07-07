using AlSafeerTraders.Application.DTOs;

namespace AlSafeerTraders.Application.Interfaces
{
    public interface IUser
    {
        Task<List<UserDTO>> GetAllUsersAsync();
        Task<UserDTO> GetUserByIdAsync(int userId);
        Task<object> AddUserAsync(UserDTO dto);
        Task UpdateUserAsync(UserDTO user);
        Task DeleteUserAsync(int userId);
        Task<UserDTO> ValidUser(LoginDTO dto);
        Task ResetPasswordAsync(ResetPasswordDTO dto);
    }
}
