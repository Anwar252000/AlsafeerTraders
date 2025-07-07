using AlSafeerTraders.Application.DTOs;


namespace AlSafeerTraders.Application.Interfaces
{
    public interface IClientType
    {
        Task<List<ClientTypeDTO>> GetAllClientTypeAsync();
        Task<ClientTypeDTO> GetClientTypeByIdAsync(int clientTypeId);
        Task AddClientTypeAsync(ClientTypeDTO clientType);
        Task UpdateClientTypeAsync(ClientTypeDTO clientType);
        Task DeleteClientTypeAsync(int clientTypeId);

    }
}
