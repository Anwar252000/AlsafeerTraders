using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Domain.Entities;

namespace AlSafeerTraders.Application.Mappers
{
    public class PaymentMapper : IMapper<PaymentDTO, Payment>
    {
        public Payment MapToEntity(PaymentDTO dto)
        {
            
            return new Payment
            {
                PaymentId = dto.PaymentId,
                PaymentType = dto.PaymentType,
                Amount = dto.Amount,
                PaymentDate = dto.PaymentDate,
                PartialPayment = dto.PartialPayment,
                InvoiceId = dto.InvoiceId,
                ClientId = dto.ClientId,
                OrderId = dto.OrderId,
            };
        }

        public PaymentDTO MapToDto(Payment entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            return new PaymentDTO
            {
                PaymentId = entity.PaymentId,
                PaymentType = entity.PaymentType,
                Amount = entity.Amount,
                PaymentDate = entity.PaymentDate,
                PartialPayment = entity.PartialPayment,
                InvoiceId = entity.InvoiceId,
                ClientId = entity.ClientId,
                ClientName = entity?.Client?.ClientName,
                ClientTypeName = entity?.Client?.ClientType?.ClientTypeName,
                InvoiceName = entity?.Invoice?.InvoiceName,
                OrderId = entity.OrderId,
                OrderName = entity?.Order?.OrderName,
                IsActive = entity?.IsActive,
            };
        }

        public List<Payment> MapToEntities(PaymentDTO dto)
        {
            throw new NotImplementedException();
        }
    }
}
