using AlSafeerTraders.Api.Models;
using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ShipmentController : ControllerBase
{
    private readonly IShipment _shipmentService;
    private readonly ILogger<ShipmentController> _logger;

    public ShipmentController(ILogger<ShipmentController> logger, IShipment shipmentService)
    {
        _logger = logger;
        _shipmentService = shipmentService;
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<IEnumerable<ShipmentDTO>>> GetShipments()
    {
        _logger.LogInformation("Fetching all shipments.");
        try
        {
            var shipments = await _shipmentService.GetAllShipmentsAsync();
            return Ok(ApiResponse<IEnumerable<ShipmentDTO>>.SuccessResponse(shipments, "Shipments retrieved successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while fetching shipments.");
            return StatusCode(500, "Internal server error.");
        }
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<ShipmentDTO>> GetShipmentById(int shipmentId)
    {
        _logger.LogInformation("Fetching shipment with ID {ShipmentId}.", shipmentId);
        try
        {
            var shipment = await _shipmentService.GetShipmentByIdAsync(shipmentId);
            return Ok(ApiResponse<ShipmentDTO>.SuccessResponse(shipment, "Shipment retrieved successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while fetching shipment.");
            return StatusCode(500, "Internal server error.");
        }
    }

    [HttpPost("[action]")]
    public async Task<ActionResult<ApiResponse<ShipmentDTO>>> AddShipment([FromBody] ShipmentDTO dto)
    {
        _logger.LogInformation("Adding shipment.");
        try
        {
            await _shipmentService.AddShipmentAsync(dto);
            return Ok(ApiResponse<ShipmentDTO>.SuccessResponse(dto, "Shipment added successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while adding shipment.");
            return StatusCode(500, "Internal server error.");
        }
    }

    [HttpPut("[action]")]
    public async Task<IActionResult> UpdateShipment(ShipmentDTO dto)
    {
        _logger.LogInformation("Updating shipment with ID {ShipmentId}.", dto.ShipmentId);
        try
        {
            await _shipmentService.UpdateShipmentAsync(dto);
            return Ok(ApiResponse<ShipmentDTO>.SuccessResponse(dto, "Shipment updated successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while updating shipment.");
            return StatusCode(500, "Internal server error.");
        }
    }

    [HttpDelete("[action]")]
    public async Task<IActionResult> DeleteShipment(int shipmentId)
    {
        _logger.LogInformation("Deleting shipment with ID {ShipmentId}.", shipmentId);
        try
        {
            await _shipmentService.DeleteShipmentAsync(shipmentId);
            return Ok(ApiResponse<object>.SuccessResponse(null, "Shipment deleted successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while deleting shipment.");
            return StatusCode(500, "Internal server error.");
        }
    }
}
