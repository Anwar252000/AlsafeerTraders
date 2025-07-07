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
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoice _invoiceService;
        private readonly ILogger<InvoiceController> _logger;

        public InvoiceController(ILogger<InvoiceController> logger, IInvoice invoiceService)
        {
            _logger = logger;
            _invoiceService = invoiceService;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<InvoiceDTO>>> GetInvoices()
        {
            _logger.LogInformation("Fetching all invoices.");
            try
            {
                var invoices = await _invoiceService.GetAllInvoicesAsync();
                _logger.LogInformation("Successfully retrieved {Count} invoices.", invoices?.Count() ?? 0);
                return Ok(ApiResponse<IEnumerable<InvoiceDTO>>.SuccessResponse(invoices, "Invoices retrieved successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching all invoices.");
                return StatusCode(500, ApiResponse<IEnumerable<InvoiceDTO>>.ErrorResponse("Internal server error."));
            }
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<InvoiceDTO>> GetInvoiceById(int invoiceId)
        {
            _logger.LogInformation("Fetching invoice with ID {InvoiceId}.", invoiceId);
            try
            {
                var invoice = await _invoiceService.GetInvoiceByIdAsync(invoiceId);
                if (invoice == null)
                {
                    _logger.LogWarning("Invoice with ID {InvoiceId} not found.", invoiceId);
                    return NotFound(ApiResponse<object>.ErrorResponse("Invoice not found."));
                }

                _logger.LogInformation("Successfully retrieved invoice with ID {InvoiceId}.", invoiceId);
                return Ok(ApiResponse<InvoiceDTO>.SuccessResponse(invoice, "Invoice retrieved successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching invoice with ID {InvoiceId}.", invoiceId);
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Internal server error."));
            }
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<ApiResponse<InvoiceDTO>>> AddInvoice([FromBody] InvoiceDTO dto)
        {
            _logger.LogInformation("Adding a new invoice with name {InvoiceName}.", dto.InvoiceName);
            try
            {
                await _invoiceService.AddInvoiceAsync(dto);
                _logger.LogInformation("Successfully added invoice with ID {InvoiceId}.", dto.InvoiceId);
                return Ok(ApiResponse<InvoiceDTO>.SuccessResponse(dto, "Invoice added successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding a new invoice.");
                return StatusCode(500, ApiResponse<object>.ErrorResponse(ex.Message));
            }
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateInvoice(InvoiceDTO invoiceDto)
        {
            _logger.LogInformation("Updating invoice with ID {InvoiceId}.", invoiceDto.InvoiceId);
            try
            {
                await _invoiceService.UpdateInvoiceAsync(invoiceDto);
                _logger.LogInformation("Successfully updated invoice with ID {InvoiceId}.", invoiceDto.InvoiceId);
                return Ok(ApiResponse<InvoiceDTO>.SuccessResponse(invoiceDto, "Invoice updated successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating invoice with ID {InvoiceId}.", invoiceDto.InvoiceId);
                return StatusCode(500, ApiResponse<object>.ErrorResponse(ex.Message));
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteInvoice(int invoiceId)
        {
            _logger.LogInformation("Deleting invoice with ID {InvoiceId}.", invoiceId);
            try
            {
                await _invoiceService.DeleteInvoiceAsync(invoiceId);
                _logger.LogInformation("Successfully deleted invoice with ID {InvoiceId}.", invoiceId);
                return Ok(ApiResponse<object>.SuccessResponse(null, "Invoice deleted successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting invoice with ID {InvoiceId}.", invoiceId);
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Internal server error."));
            }
        }
    }
}
