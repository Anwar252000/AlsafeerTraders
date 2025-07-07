using AlSafeerTraders.Application.DTOs;

namespace AlSafeerTraders.Application.Interfaces
{
    public interface IOrder
    {
        Task<List<OrderDTO>> GetAllOrdersAsync();
        Task<OrderDTO> GetOrderByIdAsync(int orderId);
        Task AddOrderAsync(OrderDTO order);
        Task UpdateOrderAsync(OrderDTO order);
        Task DeleteOrderAsync(int orderId);

    }
}
