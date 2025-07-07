using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Application.Mappers;
using AlSafeerTraders.Domain.Entities;

namespace AlSafeerTraders.Application.Mappers
{
    public class InvoiceMapper : IMapper<InvoiceDTO, Invoice>
    {
        public Invoice MapToEntity(InvoiceDTO dto)
        {
           return new Invoice
            {
                InvoiceId = dto.InvoiceId,
                InvoiceName = dto.InvoiceName,
                InvoiceDate = dto.InvoiceDate,
                InvoiceAmount = dto.InvoiceAmount,
                OrderId = dto.OrderId,
                ClientId = dto.ClientId,
            };
        }

        public InvoiceDTO MapToDto(Invoice entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            return new InvoiceDTO
            {
                InvoiceId = entity.InvoiceId,
                InvoiceName = entity.InvoiceName,
                InvoiceDate = entity.InvoiceDate,
                InvoiceAmount = entity.InvoiceAmount,
                ClientId = entity.ClientId,
                ClientName = entity?.Client?.ClientName,
                ClientTypeName = entity?.Client?.ClientType?.ClientTypeName,
                OrderId = entity?.OrderId,
                OrderName = entity?.Order?.OrderName,
                IsActive = entity?.IsActive,
            };
        }

        public List<Invoice> MapToEntities(InvoiceDTO dto)
        {
            throw new NotImplementedException();
        }
    }
}
