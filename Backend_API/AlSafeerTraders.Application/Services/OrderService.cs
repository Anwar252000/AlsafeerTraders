using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Application.Helpers;
using AlSafeerTraders.Application.Interfaces;
using AlSafeerTraders.Application.Mappers;
using AlSafeerTraders.Domain.Entities;
using AlSafeerTraders.Domain.Interface;
using Microsoft.EntityFrameworkCore;


namespace AlSafeerTraders.Application.Services
{
    public class OrderService : IOrder
    {
        private readonly IGenericRepository<Order> _orderRepository;
        private readonly OrderMapper _mapper;
        private readonly ClaimsHelper _claimsHelper;

        public OrderService(IGenericRepository<Order> orderRepository, OrderMapper mapper, ClaimsHelper claimsHelper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
            _claimsHelper = claimsHelper;
        }

        public async Task AddOrderAsync(OrderDTO dto)
        {
            try
            {
                var orderEntity = _mapper.MapToEntity(dto);
                orderEntity.IsActive = true;
                orderEntity.CreatedAt = DateTime.Now;
                orderEntity.CreatedBy = _claimsHelper.GetUserIdFromClaims();
                await _orderRepository.AddAsync(orderEntity);
            }
            catch (Exception ex)
            {
                throw new Exception("Error adding order", ex);
            }
        }

        public async Task<List<OrderDTO>> GetAllOrdersAsync()
        {
            var orders = await _orderRepository.GetAllAsync(
                include: query => query
                .Include(c => c.Client)
                .ThenInclude(c => c.ClientType)
                .Include(p => p.Product)
                );
            //var activeOrders = orders.Where(o => o.IsActive);
            var orderDtos = orders.Select(o => _mapper.MapToDto(o)).ToList();
            return orderDtos;
        }

        public async Task<OrderDTO> GetOrderByIdAsync(int orderId)
        {
            var order = await _orderRepository.GetAllAsync(
                filter: x => x.OrderId == orderId,
                include: query => query
                .Include(c => c.Client)
                .ThenInclude(c => c.ClientType)
                .Include(p => p.Product)
                );
            var orders = order.FirstOrDefault();
            return orders != null && orders.IsActive ? _mapper.MapToDto(orders) : null;
        }

        public async Task UpdateOrderAsync(OrderDTO orderDto)
        {
            try
            {
                var orderEntity = _mapper.MapToEntity(orderDto);
                orderEntity.IsActive = true;
                orderEntity.UpdatedAt = DateTime.Now;
                orderEntity.UpdatedBy = _claimsHelper.GetUserIdFromClaims();
                await _orderRepository.UpdateAsync(orderEntity);
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating order", ex);
            }
        }

        public async Task DeleteOrderAsync(int orderId)
        {
            var order = await _orderRepository.GetByIdAsync(orderId);
            if (order != null)
            {
                order.IsActive = !order.IsActive;
                await _orderRepository.UpdateAsync(order);
            }
            else
            {
                throw new Exception("Order not found.");
            }
        }
    }
}
