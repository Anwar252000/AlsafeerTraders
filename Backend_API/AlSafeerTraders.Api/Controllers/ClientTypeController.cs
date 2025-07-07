using Microsoft.AspNetCore.Mvc;
using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Application.Interfaces;
using AlSafeerTraders.Api.Models;
using Microsoft.AspNetCore.Authorization;

namespace SchoolManagementSystem.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ClientTypeController : ControllerBase
    {
        private readonly IClientType _clientTypeService;
        private readonly ILogger<ClientTypeController> _logger;

        public ClientTypeController(ILogger<ClientTypeController> logger, IClientType clientTypeService)
        {
            _logger = logger;
            _clientTypeService = clientTypeService;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<ClientTypeDTO>>> GetClientTypes()
        {
            _logger.LogInformation("Fetching all client types.");
            try
            {
                var clientTypes = await _clientTypeService.GetAllClientTypeAsync();
                _logger.LogInformation("Successfully retrieved {Count} client types.", clientTypes?.Count() ?? 0);

                return Ok(ApiResponse<IEnumerable<ClientTypeDTO>>.SuccessResponse(clientTypes, "Client types retrieved successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching all client types.");
                return StatusCode(500, ApiResponse<IEnumerable<ClientTypeDTO>>.ErrorResponse("Internal server error."));
            }
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<ClientTypeDTO>> GetClientTypeById(int clientTypeId)
        {
            _logger.LogInformation("Fetching client type with ID {ClientTypeId}.", clientTypeId);
            try
            {
                var clientType = await _clientTypeService.GetClientTypeByIdAsync(clientTypeId);
                if (clientType == null)
                {
                    _logger.LogWarning("Client type with ID {ClientTypeId} not found.", clientTypeId);
                    return NotFound(ApiResponse<object>.ErrorResponse("Client type not found."));
                }

                _logger.LogInformation("Successfully retrieved client type with ID {ClientTypeId}.", clientTypeId);
                return Ok(ApiResponse<ClientTypeDTO>.SuccessResponse(clientType, "Client type retrieved successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching client type with ID {ClientTypeId}.", clientTypeId);
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Internal server error."));
            }
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<ApiResponse<ClientTypeDTO>>> AddClientType([FromBody] ClientTypeDTO dto)
        {
            _logger.LogInformation("Adding a new client type with name {ClientTypeName}.", dto.ClientTypeName);
            try
            {
                await _clientTypeService.AddClientTypeAsync(dto);
                _logger.LogInformation("Successfully added client type with ID {ClientTypeId}.", dto.ClientTypeId);
                return Ok(ApiResponse<ClientTypeDTO>.SuccessResponse(dto, "Client type added successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding a new client type.");
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Internal server error."));
            }
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateClientType(ClientTypeDTO clientTypeDto)
        {
            _logger.LogInformation("Updating client type with ID {ClientTypeId}.", clientTypeDto.ClientTypeId);
            try
            {
                await _clientTypeService.UpdateClientTypeAsync(clientTypeDto);
                _logger.LogInformation("Successfully updated client type with ID {ClientTypeId}.", clientTypeDto.ClientTypeId);
                return Ok(ApiResponse<ClientTypeDTO>.SuccessResponse(clientTypeDto, "Client type updated successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating client type with ID {ClientTypeId}.", clientTypeDto.ClientTypeId);
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Internal server error."));
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteClientType(int clientTypeId)
        {
            _logger.LogInformation("Deleting client type with ID {ClientTypeId}.", clientTypeId);
            try
            {
                await _clientTypeService.DeleteClientTypeAsync(clientTypeId);
                _logger.LogInformation("Successfully deleted client type with ID {ClientTypeId}.", clientTypeId);
                return Ok(ApiResponse<object>.SuccessResponse(null, "Client type deleted successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting client type with ID {ClientTypeId}.", clientTypeId);
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Internal server error."));
            }
        }
    }
}
