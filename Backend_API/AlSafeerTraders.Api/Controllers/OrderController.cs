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
    public class OrderController : ControllerBase
    {
        private readonly IOrder _orderService;
        private readonly ILogger<OrderController> _logger;

        public OrderController(ILogger<OrderController> logger, IOrder orderService)
        {
            _logger = logger;
            _orderService = orderService;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetOrders()
        {
            _logger.LogInformation("Fetching all orders.");
            try
            {
                var orders = await _orderService.GetAllOrdersAsync();
                _logger.LogInformation("Successfully retrieved {Count} orders.", orders?.Count() ?? 0);
                return Ok(ApiResponse<IEnumerable<OrderDTO>>.SuccessResponse(orders, "Orders retrieved successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching all orders.");
                return StatusCode(500, ApiResponse<IEnumerable<OrderDTO>>.ErrorResponse("Internal server error."));
            }
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<OrderDTO>> GetOrderById(int orderId)
        {
            _logger.LogInformation("Fetching order with ID {OrderId}.", orderId);
            try
            {
                var order = await _orderService.GetOrderByIdAsync(orderId);
                if (order == null)
                {
                    _logger.LogWarning("Order with ID {OrderId} not found.", orderId);
                    return NotFound(ApiResponse<object>.ErrorResponse("Order not found."));
                }

                _logger.LogInformation("Successfully retrieved order with ID {OrderId}.", orderId);
                return Ok(ApiResponse<OrderDTO>.SuccessResponse(order, "Order retrieved successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching order with ID {OrderId}.", orderId);
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Internal server error."));
            }
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<ApiResponse<OrderDTO>>> AddOrder([FromBody] OrderDTO dto)
        {
            _logger.LogInformation("Adding a new order with name {OrderName}.", dto.OrderName);
            try
            {
                await _orderService.AddOrderAsync(dto);
                _logger.LogInformation("Successfully added order with ID {OrderId}.", dto.OrderId);
                return Ok(ApiResponse<OrderDTO>.SuccessResponse(dto, "Order added successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding a new order.");
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Internal server error."));
            }
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateOrder(OrderDTO orderDto)
        {
            _logger.LogInformation("Updating order with ID {OrderId}.", orderDto.OrderId);
            try
            {
                await _orderService.UpdateOrderAsync(orderDto);
                _logger.LogInformation("Successfully updated order with ID {OrderId}.", orderDto.OrderId);
                return Ok(ApiResponse<OrderDTO>.SuccessResponse(orderDto, "Order updated successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating order with ID {OrderId}.", orderDto.OrderId);
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Internal server error."));
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteOrder(int orderId)
        {
            _logger.LogInformation("Deleting order with ID {OrderId}.", orderId);
            try
            {
                await _orderService.DeleteOrderAsync(orderId);
                _logger.LogInformation("Successfully deleted order with ID {OrderId}.", orderId);
                return Ok(ApiResponse<object>.SuccessResponse(null, "Order deleted successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting order with ID {OrderId}.", orderId);
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Internal server error."));
            }
        }
    }
}
