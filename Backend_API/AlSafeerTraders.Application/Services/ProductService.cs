using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Application.Helpers;
using AlSafeerTraders.Application.Interfaces;
using AlSafeerTraders.Application.Mappers;
using AlSafeerTraders.Domain.Entities;
using AlSafeerTraders.Domain.Interface;
using Microsoft.AspNetCore.Http;

namespace AlSafeerTraders.Application.Services
{
    public class ProductService : IProduct
    {
        private readonly IGenericRepository<Product> _productRepository;
        private readonly ProductMapper _mapper;
        private readonly ClaimsHelper _claimsHelper;

        public ProductService(IGenericRepository<Product> productRepository, ProductMapper mapper, ClaimsHelper claimsHelper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _claimsHelper = claimsHelper;
        }

        public async Task AddProductAsync(ProductDTO dto)
        {
            try
            {
                var productEntity = _mapper.MapToEntity(dto);
                productEntity.IsActive = true;
                productEntity.CreatedAt = DateTime.Now;
                productEntity.CreatedBy = _claimsHelper.GetUserIdFromClaims();
                await _productRepository.AddAsync(productEntity);
            }
            catch (Exception ex)
            {
                throw new Exception("Error adding product", ex);
            }
        }

        public async Task<List<ProductDTO>> GetAllProductsAsync()
        {
            var products = await _productRepository.GetAllAsync();
            //var activeProducts = products.Where(p => p.IsActive);
            var productDtos = products.Select(p => _mapper.MapToDto(p)).ToList();
            return productDtos;
        }

        public async Task<ProductDTO> GetProductByIdAsync(int productId)
        {
            var product = await _productRepository.GetByIdAsync(productId);
            return product != null && product.IsActive ? _mapper.MapToDto(product) : null;
        }

        public async Task UpdateProductAsync(ProductDTO productDto)
        {
            try
            {
                var productEntity = _mapper.MapToEntity(productDto);
                productEntity.IsActive = true;
                productEntity.UpdatedAt = DateTime.Now;
                productEntity.UpdatedBy = _claimsHelper.GetUserIdFromClaims();
                await _productRepository.UpdateAsync(productEntity);
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating product", ex);
            }
        }

        public async Task DeleteProductAsync(int productId)
        {
            var product = await _productRepository.GetByIdAsync(productId);
            if (product != null)
            {
                product.IsActive = !product.IsActive;
                await _productRepository.UpdateAsync(product);
            }
            else
            {
                throw new Exception("Product not found.");
            }
        }

    }
}
