using AlSafeerTraders.Api.Models;
using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserPermissionController : ControllerBase
{
    private readonly IUserPermission _userPermissionService;
    private readonly ILogger<UserPermissionController> _logger;

    public UserPermissionController(ILogger<UserPermissionController> logger, IUserPermission userPermissionService)
    {
        _logger = logger;
        _userPermissionService = userPermissionService;
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<IEnumerable<UserPermissionDTO>>> GetUserPermissions()
    {
        _logger.LogInformation("Fetching all User Permissions.");
        try
        {
            var users = await _userPermissionService.GetAllUserPermissionsAsync();
            return Ok(ApiResponse<IEnumerable<UserPermissionDTO>>.SuccessResponse(users, "User Permissions retrieved successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while fetching User Permissions.");
            return StatusCode(500, "Internal server error.");
        }
    }

    //[HttpGet("[action]")]
    //public async Task<ActionResult<IEnumerable<UserPermissionViewDTO>>> GetUserPermissionsView()
    //{
    //    _logger.LogInformation("Fetching all User Permissions.");
    //    try
    //    {
    //        var users = await _userPermissionService.GetAllUserPermissionsAsync();
    //        return Ok(ApiResponse<IEnumerable<UserPermissionViewDTO>>.SuccessResponse(users, "User Permissions retrieved successfully"));
    //    }
    //    catch (Exception ex)
    //    {
    //        _logger.LogError(ex, "An error occurred while fetching User Permissions.");
    //        return StatusCode(500, "Internal server error.");
    //    }
    //}

    [HttpGet("[action]")]
    public async Task<ActionResult<UserPermissionDTO>> GetUserPermissionById(int userPermissionId)
    {
        _logger.LogInformation("Fetching user Permission with ID {UserPermissionId}.", userPermissionId);
        try
        {
            var user = await _userPermissionService.GetUserPermissionByIdAsync(userPermissionId);
            return Ok(ApiResponse<UserPermissionDTO>.SuccessResponse(user, "User Permission retrieved successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while fetching User Permission.");
            return StatusCode(500, "Internal server error.");
        }
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<IEnumerable<UserPermissionViewDTO>>> GetUserPermissionAsync(int userId)
    {
        _logger.LogInformation("Fetching user Permission with ID {UserPermissionId}.", userId);
        try
        {
            var user = await _userPermissionService.GetUserPermissionAsync(userId);
            return Ok(ApiResponse<List<UserPermissionViewDTO>>.SuccessResponse(user, "User Permission retrieved successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while fetching User Permission.");
            return StatusCode(500, "Internal server error.");
        }
    }


    [HttpPost("[action]")]
    public async Task<ActionResult<ApiResponse<AddUserPermissionDTO>>> AddUserPermission([FromBody] AddUserPermissionDTO dto)
    {
        _logger.LogInformation("Adding a new User Permission.");
        try
        {
            await _userPermissionService.AddUserPermissionAsync(dto);
            return Ok(ApiResponse<AddUserPermissionDTO>.SuccessResponse(dto, "User Permission added successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while adding a new User Permission.");
            return StatusCode(500, "Internal server error.");
        }
    }
   
    [HttpPut("[action]")]
    public async Task<IActionResult> UpdateUserPermission(UserPermissionDTO dto)
    {
        _logger.LogInformation("Updating User Permission with ID {UserPermissionId}.", dto.UserPermissionId);
        try
        {
            await _userPermissionService.UpdateUserPermissionAsync(dto);
            return Ok(ApiResponse<UserPermissionDTO>.SuccessResponse(dto, "User Permission updated successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while updating User Permission.");
            return StatusCode(500, "Internal server error.");
        }
    }

    [HttpDelete("[action]")]
    public async Task<IActionResult> DeleteUserPermission(int userPermissionId)
    {
        _logger.LogInformation("Deleting User Permission with ID {UserPermissionId}.", userPermissionId);
        try
        {
            await _userPermissionService.DeleteUserPermissionAsync(userPermissionId);
            return Ok(ApiResponse<object>.SuccessResponse(null, "User Permission deleted successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while deleting User Permission.");
            return StatusCode(500, "Internal server error.");
        }
    }

}
