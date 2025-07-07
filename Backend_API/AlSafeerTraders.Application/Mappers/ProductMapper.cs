using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Domain.Entities;

namespace AlSafeerTraders.Application.Mappers
{
    public class ProductMapper : IMapper<ProductDTO, Product>
    {
        public Product MapToEntity(ProductDTO dto)
        {
            return new Product
            {
                ProductId = dto.ProductId,
                ProductName = dto.ProductName,
                Picture = dto.Picture,
                QtyInHand = dto.QtyInHand,
            };
        }

        public ProductDTO MapToDto(Product entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            return new ProductDTO
            {
                ProductId = entity.ProductId,
                ProductName = entity.ProductName,
                Picture = entity.Picture,
                QtyInHand = entity.QtyInHand,
                IsActive = entity.IsActive
            };
        }

        public List<Product> MapToEntities(ProductDTO dto)
        {
            throw new NotImplementedException();
        }
    }
}
