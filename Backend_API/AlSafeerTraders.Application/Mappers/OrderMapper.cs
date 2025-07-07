using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Domain.Entities;

namespace AlSafeerTraders.Application.Mappers
{
    public class OrderMapper : IMapper<OrderDTO, Order>
    {
        public Order MapToEntity(OrderDTO dto)
        {

            return new Order
            {
                OrderId = dto.OrderId,
                OrderName = dto.OrderName,
                OrderDate = dto.OrderDate,
                OrderStatus = dto.OrderStatus,
                Qty = dto.Qty,
                Weight = dto.Weight,
                ProductId = dto.ProductId,
                ClientId = dto.ClientId,
            };
        }

        public OrderDTO MapToDto(Order entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            return new OrderDTO
            {
                OrderId = entity.OrderId,
                OrderName = entity.OrderName,
                OrderDate = entity.OrderDate,
                OrderStatus = entity.OrderStatus,
                Qty = entity.Qty,
                Weight = entity.Weight,
                ProductId = entity.ProductId,
                ProductName = entity.Product?.ProductName,
                ClientId = entity.ClientId,
                ClientName = entity?.Client?.ClientName,
                ClientTypeName = entity?.Client?.ClientType?.ClientTypeName,
                IsActive = entity?.IsActive,
            };
        }

        public List<Order> MapToEntities(OrderDTO dto)
        {
            throw new NotImplementedException();
        }
    }
}
