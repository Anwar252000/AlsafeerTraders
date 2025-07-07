using Microsoft.AspNetCore.Mvc;
using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Application.Interfaces;
using AlSafeerTraders.Api.Models;
using Microsoft.AspNetCore.Authorization;

namespace AlSafeerTraders.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpense _expenseService;
        private readonly ILogger<ExpenseController> _logger;

        public ExpenseController(ILogger<ExpenseController> logger, IExpense expenseService)
        {
            _logger = logger;
            _expenseService = expenseService;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<ExpenseDTO>>> GetExpenses()
        {
            _logger.LogInformation("Fetching all expenses.");
            try
            {
                var expenses = await _expenseService.GetAllExpensesAsync();
                _logger.LogInformation("Successfully retrieved {Count} expenses.", expenses?.Count() ?? 0);
                return Ok(ApiResponse<IEnumerable<ExpenseDTO>>.SuccessResponse(expenses, "Expenses retrieved successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching all expenses.");
                return StatusCode(500, ApiResponse<IEnumerable<ExpenseDTO>>.ErrorResponse("Internal server error."));
            }
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<ExpenseDTO>> GetExpenseById(int expenseId)
        {
            _logger.LogInformation("Fetching expense with ID {ExpenseId}.", expenseId);
            try
            {
                var expense = await _expenseService.GetExpenseByIdAsync(expenseId);
                if (expense == null)
                {
                    _logger.LogWarning("Expense with ID {ExpenseId} not found.", expenseId);
                    return NotFound(ApiResponse<object>.ErrorResponse("Expense not found."));
                }

                return Ok(ApiResponse<ExpenseDTO>.SuccessResponse(expense, "Expense retrieved successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching expense with ID {ExpenseId}.", expenseId);
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<ApiResponse<ExpenseDTO>>> AddExpense([FromForm] ExpenseDTO expenseDto)
        {
            _logger.LogInformation("Adding a new expense: {ExpenseName}.", expenseDto.ExpenseType);

            try
            {
                if (expenseDto.PictureFile != null && expenseDto.PictureFile.Length > 0)
                {
                    expenseDto.Picture = await SaveImageAsync(expenseDto.PictureFile); 
                }
                else
                {
                    expenseDto.Picture = null; 
                }
                await _expenseService.AddExpenseAsync(expenseDto);
                return Ok(ApiResponse<ExpenseDTO>.SuccessResponse(expenseDto, "Expense added successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding a new expense.");
                return StatusCode(500, ApiResponse<ExpenseDTO>.ErrorResponse("Internal server error."));
            }
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateExpense([FromForm] ExpenseDTO expenseDto)
        {
            _logger.LogInformation("Updating expense with ID {ExpenseId}.", expenseDto.ExpenseId);
            try
            {
                if (expenseDto.PictureFile != null && expenseDto.PictureFile.Length > 0)
                {
                    expenseDto.Picture = await SaveImageAsync(expenseDto.PictureFile);
                }
                await _expenseService.UpdateExpenseAsync(expenseDto);
                return Ok(ApiResponse<ExpenseDTO>.SuccessResponse(expenseDto, "Expense updated successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating expense with ID {ExpenseId}.", expenseDto.ExpenseId);
                return StatusCode(500, "Internal server error.");
            }
        }


        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteExpense(int expenseId)
        {
            _logger.LogInformation("Deleting expense with ID {ExpenseId}.", expenseId);
            try
            {
                await _expenseService.DeleteExpenseAsync(expenseId);
                return Ok(ApiResponse<object>.SuccessResponse(null, "Expense deleted successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting expense with ID {ExpenseId}.", expenseId);
                return StatusCode(500, "Internal server error.");
            }
        }

        private static async Task<string> SaveImageAsync(IFormFile pictureFile)
        {
            if (pictureFile == null || pictureFile.Length == 0)
                return null;

            var folderPath = Path.Combine("wwwroot", "images", "expenses");
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            var fileName = $"{Guid.NewGuid()}_{pictureFile.FileName}";
            var filePath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await pictureFile.CopyToAsync(stream);
            }

            return Path.Combine("images", "expenses", fileName).Replace("\\", "/");
        }
    }
}
