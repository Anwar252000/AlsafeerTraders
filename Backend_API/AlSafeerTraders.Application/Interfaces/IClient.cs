using AlSafeerTraders.Application.DTOs;


namespace AlSafeerTraders.Application.Interfaces
{
    public interface IClient
    {
        Task<List<ClientDTO>> GetAllClientsAsync();
        Task<ClientDTO> GetClientByIdAsync(int clientId);
        Task AddClientAsync(ClientDTO client);
        Task UpdateClientAsync(ClientDTO client);
        Task DeleteClientAsync(int clientId);

    }
}
