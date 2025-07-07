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
    public class ProductController : ControllerBase
    {
        private readonly IProduct _productService;
        private readonly ILogger<ProductController> _logger;

        public ProductController(ILogger<ProductController> logger, IProduct productService)
        {
            _logger = logger;
            _productService = productService;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> GetProducts()
        {
            _logger.LogInformation("Fetching all products.");
            try
            {
                var products = await _productService.GetAllProductsAsync();
                _logger.LogInformation("Successfully retrieved {Count} products.", products?.Count() ?? 0);
                return Ok(ApiResponse<IEnumerable<ProductDTO>>.SuccessResponse(products, "Products retrieved successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching all products.");
                return StatusCode(500, ApiResponse<IEnumerable<ProductDTO>>.ErrorResponse("Internal server error."));
            }
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<ProductDTO>> GetProductById(int productId)
        {
            _logger.LogInformation("Fetching product with ID {ProductId}.", productId);
            try
            {
                var product = await _productService.GetProductByIdAsync(productId);
                if (product == null)
                {
                    _logger.LogWarning("Product with ID {ProductId} not found.", productId);
                    return NotFound(ApiResponse<object>.ErrorResponse("Product not found."));
                }

                return Ok(ApiResponse<ProductDTO>.SuccessResponse(product, "Product retrieved successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching product with ID {ProductId}.", productId);
                return StatusCode(500, "Internal server error.");
            }
        }

        //[HttpPost("[action]")]
        //public async Task<ActionResult<ApiResponse<ProductDTO>>> AddProduct([FromBody] ProductDTO dto)
        //{
        //    _logger.LogInformation("Adding a new product: {ProductName}.", dto.ProductName);
        //    try
        //    {
        //        await _productService.AddProductAsync(dto);
        //        return Ok(ApiResponse<ProductDTO>.SuccessResponse(dto, "Product added successfully"));
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex, "An error occurred while adding a new product.");
        //        return StatusCode(500, "Internal server error.");
        //    }
        //}
        [HttpPost("[action]")]
        public async Task<ActionResult<ApiResponse<ProductDTO>>> AddProduct([FromForm] ProductDTO productDto)
        {
            _logger.LogInformation("Adding a new product: {ProductName}.", productDto.ProductName);

            try
            {
                if (productDto.PictureFile != null && productDto.PictureFile.Length > 0)
                {
                    productDto.Picture = await SaveImageAsync(productDto.PictureFile); 
                }
                else
                {
                    productDto.Picture = null; 
                }
                await _productService.AddProductAsync(productDto);
                return Ok(ApiResponse<ProductDTO>.SuccessResponse(productDto, "Product added successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding a new product.");
                return StatusCode(500, ApiResponse<ProductDTO>.ErrorResponse("Internal server error."));
            }
        }

        //[HttpPut("[action]")]
        //public async Task<IActionResult> UpdateProduct(ProductDTO dto)
        //{
        //    _logger.LogInformation("Updating product with ID {ProductId}.", dto.ProductId);
        //    try
        //    {
        //        await _productService.UpdateProductAsync(dto);
        //        return Ok(ApiResponse<ProductDTO>.SuccessResponse(dto, "Product updated successfully"));
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex, "An error occurred while updating product with ID {ProductId}.", dto.ProductId);
        //        return StatusCode(500, "Internal server error.");
        //    }
        //}

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateProduct([FromForm] ProductDTO productDto)
        {
            _logger.LogInformation("Updating product with ID {ProductId}.", productDto.ProductId);
            try
            {
                if (productDto.PictureFile != null && productDto.PictureFile.Length > 0)
                {
                    productDto.Picture = await SaveImageAsync(productDto.PictureFile);
                }
                await _productService.UpdateProductAsync(productDto);
                return Ok(ApiResponse<ProductDTO>.SuccessResponse(productDto, "Product updated successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating product with ID {ProductId}.", productDto.ProductId);
                return StatusCode(500, "Internal server error.");
            }
        }


        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteProduct(int productId)
        {
            _logger.LogInformation("Deleting product with ID {ProductId}.", productId);
            try
            {
                await _productService.DeleteProductAsync(productId);
                return Ok(ApiResponse<object>.SuccessResponse(null, "Product deleted successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting product with ID {ProductId}.", productId);
                return StatusCode(500, "Internal server error.");
            }
        }

        private static async Task<string> SaveImageAsync(IFormFile pictureFile)
        {
            if (pictureFile == null || pictureFile.Length == 0)
                return null;

            var folderPath = Path.Combine("wwwroot", "images", "products");
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

            return Path.Combine("images", "products", fileName).Replace("\\", "/");
        }
    }
}
