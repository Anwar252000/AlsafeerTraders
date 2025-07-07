using AlSafeerTraders.Api.Models;
using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SchoolManagementSystem.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly IClient _clientService;
        private readonly ILogger<ClientController> _logger;

        public ClientController(ILogger<ClientController> logger, IClient clientService)
        {
            _logger = logger;
            _clientService = clientService;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<ClientDTO>>> GetClients()
        {
            _logger.LogInformation("Fetching all clients.");
            try
            {
                var clients = await _clientService.GetAllClientsAsync();
                _logger.LogInformation("Successfully retrieved {Count} clients.", clients?.Count() ?? 0);

                return Ok(ApiResponse<IEnumerable<ClientDTO>>.SuccessResponse(clients, "Clients retrieved successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching all clients.");
                return StatusCode(500, ApiResponse<IEnumerable<ClientDTO>>.ErrorResponse("Internal server error."));
            }
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<ClientDTO>> GetClientById(int clientId)
        {
            _logger.LogInformation("Fetching client with ID {ClientId}.", clientId);
            try
            {
                var client = await _clientService.GetClientByIdAsync(clientId);
                if (client == null)
                {
                    _logger.LogWarning("Client with ID {ClientId} not found.", clientId);
                    return NotFound(ApiResponse<object>.ErrorResponse("Client not found."));
                }

                _logger.LogInformation("Successfully retrieved client with ID {ClientId}.", clientId);
                return Ok(ApiResponse<ClientDTO>.SuccessResponse(client, "Client retrieved successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching client with ID {ClientId}.", clientId);
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Internal server error."));
            }
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<ApiResponse<ClientDTO>>> AddClient([FromBody] ClientDTO dto)
        {
            _logger.LogInformation("Adding a new client with name {ClientName}.", dto.ClientName);
            try
            {
                await _clientService.AddClientAsync(dto);
                _logger.LogInformation("Successfully added client with ID {ClientId}.", dto.ClientId);
                return Ok(ApiResponse<ClientDTO>.SuccessResponse(dto, "Client added successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding a new client.");
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Internal server error."));
            }
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateClient(ClientDTO clientDto)
        {
            _logger.LogInformation("Updating client with ID {ClientId}.", clientDto.ClientId);
            try
            {
                await _clientService.UpdateClientAsync(clientDto);
                _logger.LogInformation("Successfully updated client with ID {ClientId}.", clientDto.ClientId);
                return Ok(ApiResponse<ClientDTO>.SuccessResponse(clientDto, "Client updated successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating client with ID {ClientId}.", clientDto.ClientId);
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Internal server error."));
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteClient(int clientId)
        {
            _logger.LogInformation("Deleting client with ID {ClientId}.", clientId);
            try
            {
                await _clientService.DeleteClientAsync(clientId);
                _logger.LogInformation("Successfully deleted client with ID {ClientId}.", clientId);
                return Ok(ApiResponse<object>.SuccessResponse(null, "Client deleted successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting client with ID {ClientId}.", clientId);
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Internal server error."));
            }
        }
    }
}
