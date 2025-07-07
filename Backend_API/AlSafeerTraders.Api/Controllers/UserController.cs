using AlSafeerTraders.Api.Models;
using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Application.Interfaces;
using AlSafeerTraders.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Security.Cryptography;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUser _userService;
    private readonly ILogger<UserController> _logger;
    private readonly JWTService _jwtService;
    private readonly IConfiguration _configuration;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserController(ILogger<UserController> logger, IUser userService, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
    {
        _logger = logger;
        _userService = userService;
        _configuration = configuration;
        _jwtService = new JWTService(
            _configuration["Jwt:key"],
            _configuration["Jwt:issuer"],
            _configuration["Jwt:audience"]);
        _httpContextAccessor = httpContextAccessor;
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsers()
    {
        _logger.LogInformation("Fetching all users.");
        try
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(ApiResponse<IEnumerable<UserDTO>>.SuccessResponse(users, "Users retrieved successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while fetching users.");
            return StatusCode(500, "Internal server error.");
        }
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<UserDTO>> GetUserById(int userId)
    {
        _logger.LogInformation("Fetching user with ID {UserId}.", userId);
        try
        {
            var user = await _userService.GetUserByIdAsync(userId);
            return Ok(ApiResponse<UserDTO>.SuccessResponse(user, "User retrieved successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while fetching user.");
            return StatusCode(500, "Internal server error.");
        }
    }

    [HttpPost("[action]")]
    public async Task<ActionResult<ApiResponse<UserDTO>>> AddUser([FromBody] UserDTO dto)
    {
        _logger.LogInformation("Adding a new user.");
        try
        {
            await _userService.AddUserAsync(dto);
            return Ok(ApiResponse<UserDTO>.SuccessResponse(dto, "User added successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while adding a new user.");
            return StatusCode(500, ApiResponse<object>.ErrorResponse(ex.Message));
        }
    }

    [AllowAnonymous]
    [HttpPost("[action]")]
    public async Task<ActionResult<ApiResponse<UserDTO>>> LoginUser([FromBody] LoginDTO dto)
    {
        _logger.LogInformation("Attempting to log in user.");

        try
        {
            var user = await _userService.ValidUser(dto);

            if (user == null)
            {
                _logger.LogWarning("Invalid login attempt.");
                return Unauthorized(ApiResponse<UserDTO>.ErrorResponse("Invalid username or password."));
            }

            var accessToken = _jwtService.GenerateToken(user.UserId ?? 0, user?.RoleName ?? "");
            var refreshToken = GenerateRefreshToken();
            SetRefreshToken(refreshToken);
            return Ok(ApiResponse<object>.SuccessResponse(new { user, accessToken }, "Login successful"));
        }
        catch (UnauthorizedAccessException ex)
        {
            _logger.LogWarning(ex, "Unauthorized access - Invalid credentials.");
            return Unauthorized(ApiResponse<UserDTO>.ErrorResponse("Invalid username or password."));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while attempting to log in.");
            return StatusCode(500, ApiResponse<UserDTO>.ErrorResponse("Internal server error."));
        }
    }

    [AllowAnonymous]
    [HttpPost("[action]")]
    public async Task<ActionResult<string>> RefreshToken()
    {
        var refreshToken = Request.Cookies["refreshToken"];

        if (string.IsNullOrEmpty(refreshToken))
        {
            return Unauthorized("Invalid Refresh Token");
        }

        var userId = _httpContextAccessor?.HttpContext?.User?.Claims?.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        int.TryParse(userId, out int parsedUserId);
        var user = await _userService.GetUserByIdAsync(parsedUserId);
        //var newRefreshToken = GenerateRefreshToken();
        var accessToken = _jwtService.GenerateToken(parsedUserId, user?.RoleName ?? "");
//        SetRefreshToken(newRefreshToken);
        return Ok(new { accessToken });
    }
    private RefreshToken GenerateRefreshToken()
    {
        var refreshToken = new RefreshToken
        {
            Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
            Expires = DateTime.Now.AddDays(7),            
        };
        return refreshToken;
    }

    private void SetRefreshToken(RefreshToken newRefreshToken)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = newRefreshToken.Expires,
            SameSite = SameSiteMode.None,
            Secure = true,
        };
        Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);
    }


    [HttpPut("[action]")]
    public async Task<IActionResult> UpdateUser(UserDTO dto)
    {
        _logger.LogInformation("Updating user with ID {UserId}.", dto.UserId);
        try
        {
            await _userService.UpdateUserAsync(dto);
            return Ok(ApiResponse<UserDTO>.SuccessResponse(dto, "User updated successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while updating user.");
            return StatusCode(500, "Internal server error.");
        }
    }

    [HttpDelete("[action]")]
    public async Task<IActionResult> DeleteUser(int userId)
    {
        _logger.LogInformation("Deleting user with ID {UserId}.", userId);
        try
        {
            await _userService.DeleteUserAsync(userId);
            return Ok(ApiResponse<object>.SuccessResponse(null, "User deleted successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while deleting user.");
            return StatusCode(500, "Internal server error.");
        }
    }

    //[AllowAnonymous]
    [HttpPut("[action]")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO dto)
    {
        _logger.LogInformation("Resetting password for user with ID {UserId}.", dto.UserId);

        try
        {
            await _userService.ResetPasswordAsync(dto);
            return Ok(ApiResponse<object>.SuccessResponse(null, "Password reset successfully"));
        }
        catch (UnauthorizedAccessException ex)
        {
            _logger.LogWarning(ex, "Unauthorized password reset attempt.");
            return Unauthorized(ApiResponse<object>.ErrorResponse("Old password is incorrect."));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while resetting the password.");
            return StatusCode(500, "Internal server error.");
        }
    }

}
