using AlSafeerTraders.Api.Models;
using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class PermissionController : ControllerBase
{
    private readonly IPermission _permissionService;
    private readonly ILogger<PermissionController> _logger;

    public PermissionController(ILogger<PermissionController> logger, IPermission permissionService)
    {
        _logger = logger;
        _permissionService = permissionService;
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<IEnumerable<PermissionDTO>>> GetAllPermissions()
    {
        _logger.LogInformation("Fetching all Permissions.");
        try
        {
            var users = await _permissionService.GetAllPermissionsAsync();
            return Ok(ApiResponse<IEnumerable<PermissionDTO>>.SuccessResponse(users, "Permissions retrieved successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while fetching Permissions.");
            return StatusCode(500, "Internal server error.");
        }
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<PermissionDTO>> GetPermissionById(int permissionId)
    {
        _logger.LogInformation("Fetching user Permission with ID {PermissionId}.", permissionId);
        try
        {
            var user = await _permissionService.GetPermissionByIdAsync(permissionId);
            return Ok(ApiResponse<PermissionDTO>.SuccessResponse(user, "Permission retrieved successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while fetching Permission.");
            return StatusCode(500, "Internal server error.");
        }
    }

    [HttpPost("[action]")]
    public async Task<ActionResult<ApiResponse<PermissionDTO>>> AddPermission([FromBody] PermissionDTO dto)
    {
        _logger.LogInformation("Adding a new Permission.");
        try
        {
            await _permissionService.AddPermissionAsync(dto);
            return Ok(ApiResponse<PermissionDTO>.SuccessResponse(dto, "Permission added successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while adding a new Permission.");
            return StatusCode(500, "Internal server error.");
        }
    }
   
    [HttpPut("[action]")]
    public async Task<IActionResult> UpdatePermission(PermissionDTO dto)
    {
        _logger.LogInformation("Updating Permission with ID {PermissionId}.", dto.PermissionId);
        try
        {
            await _permissionService.UpdatePermissionAsync(dto);
            return Ok(ApiResponse<PermissionDTO>.SuccessResponse(dto, "Permission updated successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while updating Permission.");
            return StatusCode(500, "Internal server error.");
        }
    }

    [HttpDelete("[action]")]
    public async Task<IActionResult> DeletePermission(int permissionId)
    {
        _logger.LogInformation("Deleting Permission with ID {PermissionId}.", permissionId);
        try
        {
            await _permissionService.DeletePermissionAsync(permissionId);
            return Ok(ApiResponse<object>.SuccessResponse(null, "Permission deleted successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while deleting Permission.");
            return StatusCode(500, "Internal server error.");
        }
    }

}
