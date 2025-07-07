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
    public class PaymentController : ControllerBase
    {
        private readonly IPayment _paymentService;
        private readonly ILogger<PaymentController> _logger;

        public PaymentController(ILogger<PaymentController> logger, IPayment paymentService)
        {
            _logger = logger;
            _paymentService = paymentService;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<PaymentDTO>>> GetPayments()
        {
            _logger.LogInformation("Fetching all payments.");
            try
            {
                var payments = await _paymentService.GetAllPaymentsAsync();
                _logger.LogInformation("Successfully retrieved {Count} payments.", payments?.Count() ?? 0);
                return Ok(ApiResponse<IEnumerable<PaymentDTO>>.SuccessResponse(payments, "Payments retrieved successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching all payments.");
                return StatusCode(500, ApiResponse<IEnumerable<PaymentDTO>>.ErrorResponse("Internal server error."));
            }
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<PaymentDTO>> GetPaymentById(int paymentId)
        {
            _logger.LogInformation("Fetching payment with ID {PaymentId}.", paymentId);
            try
            {
                var payment = await _paymentService.GetPaymentByIdAsync(paymentId);
                if (payment == null)
                {
                    _logger.LogWarning("Payment with ID {PaymentId} not found.", paymentId);
                    return NotFound(ApiResponse<object>.ErrorResponse("Payment not found."));
                }

                _logger.LogInformation("Successfully retrieved payment with ID {PaymentId}.", paymentId);
                return Ok(ApiResponse<PaymentDTO>.SuccessResponse(payment, "Payment retrieved successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching payment with ID {PaymentId}.", paymentId);
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Internal server error."));
            }
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<ApiResponse<PaymentDTO>>> AddPayment([FromBody] PaymentDTO dto)
        {
            _logger.LogInformation("Adding a new payment of type {PaymentType}.", dto.PaymentType);
            try
            {
                await _paymentService.AddPaymentAsync(dto);
                _logger.LogInformation("Successfully added payment with ID {PaymentId}.", dto.PaymentId);
                return Ok(ApiResponse<PaymentDTO>.SuccessResponse(dto, "Payment added successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding a new payment.");
                return StatusCode(500, ApiResponse<object>.ErrorResponse(ex.Message));
            }
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdatePayment(PaymentDTO paymentDto)
        {
            _logger.LogInformation("Updating payment with ID {PaymentId}.", paymentDto.PaymentId);
            try
            {
                await _paymentService.UpdatePaymentAsync(paymentDto);
                _logger.LogInformation("Successfully updated payment with ID {PaymentId}.", paymentDto.PaymentId);
                return Ok(ApiResponse<PaymentDTO>.SuccessResponse(paymentDto, "Payment updated successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating payment with ID {PaymentId}.", paymentDto.PaymentId);
                return StatusCode(500, ApiResponse<object>.ErrorResponse(ex.Message));
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeletePayment(int paymentId)
        {
            _logger.LogInformation("Deleting payment with ID {PaymentId}.", paymentId);
            try
            {
                await _paymentService.DeletePaymentAsync(paymentId);
                _logger.LogInformation("Successfully deleted payment with ID {PaymentId}.", paymentId);
                return Ok(ApiResponse<object>.SuccessResponse(null, "Payment deleted successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting payment with ID {PaymentId}.", paymentId);
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Internal server error."));
            }
        }
    }
}
