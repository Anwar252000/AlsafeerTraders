using AlSafeerTraders.Api.Models;
using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserRoleController : ControllerBase
{
    private readonly IUserRole _userRoleService;
    private readonly ILogger<UserRoleController> _logger;

    public UserRoleController(ILogger<UserRoleController> logger, IUserRole userRoleService)
    {
        _logger = logger;
        _userRoleService = userRoleService;
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<IEnumerable<UserRoleDTO>>> GetUserRoles()
    {
        _logger.LogInformation("Fetching all user roles.");
        try
        {
            var roles = await _userRoleService.GetAllUserRolesAsync();
            return Ok(ApiResponse<IEnumerable<UserRoleDTO>>.SuccessResponse(roles, "User roles retrieved successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while fetching user roles.");
            return StatusCode(500, "Internal server error.");
        }
    }

    //[HttpGet("[action]")]
    //public async Task<ActionResult<UserRoleDTO>> GetUserRoleById(int id)
    //{
    //    _logger.LogInformation("Fetching user role with ID {RoleId}.", id);
    //    try
    //    {
    //        var role = await _userRoleService.GetUserRoleByIdAsync(id);
    //        return Ok(ApiResponse<UserRoleDTO>.SuccessResponse(role, "User role retrieved successfully"));
    //    }
    //    catch (Exception ex)
    //    {
    //        _logger.LogError(ex, "An error occurred while fetching user role.");
    //        return StatusCode(500, "Internal server error.");
    //    }
    //}

    [HttpPost("[action]")]
    public async Task<ActionResult<ApiResponse<UserRoleDTO>>> AddUserRole([FromBody] UserRoleDTO dto)
    {
        _logger.LogInformation("Adding a new user role.");
        try
        {
            await _userRoleService.AddUserRoleAsync(dto);
            return Ok(ApiResponse<UserRoleDTO>.SuccessResponse(dto, "User role added successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while adding a new user role.");
            return StatusCode(500, "Internal server error.");
        }
    }

    [HttpPut("[action]")]
    public async Task<IActionResult> UpdateUserRole(UserRoleDTO dto)
    {
        _logger.LogInformation("Updating user role with ID {RoleId}.", dto.RoleId);
        try
        {
            await _userRoleService.UpdateUserRoleAsync(dto);
            return Ok(ApiResponse<UserRoleDTO>.SuccessResponse(dto, "User role updated successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while updating user role.");
            return StatusCode(500, "Internal server error.");
        }
    }

    [HttpDelete("[action]")]
    public async Task<IActionResult> DeleteUserRole(int roleId)
    {
        _logger.LogInformation("Deleting user role with ID {RoleId}.", roleId);
        try
        {
            await _userRoleService.DeleteUserRoleAsync(roleId);
            return Ok(ApiResponse<object>.SuccessResponse(null, "User role deleted successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while deleting user role.");
            return StatusCode(500, "Internal server error.");
        }
    }
}
