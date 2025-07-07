using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Application.Helpers;
using AlSafeerTraders.Application.Interfaces;
using AlSafeerTraders.Application.Mappers;
using AlSafeerTraders.Domain.Entities;
using AlSafeerTraders.Domain.Interface;
using Microsoft.EntityFrameworkCore;


namespace AlSafeerTraders.Application.Services
{
    public class PaymentService : IPayment
    {
        private readonly IGenericRepository<Payment> _paymentRepository;
        private readonly PaymentMapper _mapper;
        private readonly ClaimsHelper _claimsHelper;

        public PaymentService(IGenericRepository<Payment> paymentRepository, PaymentMapper mapper, ClaimsHelper claimsHelper)
        {
            _paymentRepository = paymentRepository;
            _mapper = mapper;
            _claimsHelper = claimsHelper;
        }

        public async Task AddPaymentAsync(PaymentDTO dto)
        {
            var existingPayments = await _paymentRepository.GetAllAsync(
                x => x.OrderId == dto.OrderId && x.ClientId == dto.ClientId &&
                x.Amount == dto.Amount && x.PaymentDate == dto.PaymentDate && x.IsActive
                );
            if (existingPayments.Any())
            {
                throw new Exception("Payment already present");
            }
            else
            {
                try
                {
                    var paymentEntity = _mapper.MapToEntity(dto);
                    paymentEntity.IsActive = true;
                    paymentEntity.CreatedAt = DateTime.Now;
                    paymentEntity.CreatedBy = _claimsHelper.GetUserIdFromClaims();
                    await _paymentRepository.AddAsync(paymentEntity);
                }
                catch (Exception ex)
                {
                    throw new Exception("Error adding payment", ex);
                }
            }
        }

        public async Task<List<PaymentDTO>> GetAllPaymentsAsync()
        {
            var payments = await _paymentRepository.GetAllAsync(
                 include: query => query
                .Include(x=>x.Invoice)
                .Include(x=>x.Client)
                .ThenInclude(x=>x.ClientType)
                .Include(x=>x.Order)
                );
            //var activePayments = payments.Where(p => p.IsActive);
            var paymentDtos = payments.Select(p => _mapper.MapToDto(p)).ToList();
            return paymentDtos;
        }

        public async Task<PaymentDTO> GetPaymentByIdAsync(int paymentId)
        {
            var payment = await _paymentRepository.GetAllAsync(
                 filter: s => s.PaymentId == paymentId,
                 include: query => query
                 .Include(s => s.Client)
                 .ThenInclude(x => x.ClientType)
                 .Include(x => x.Invoice)
                 .Include(x => x.Order)
                 );
            var payments = payment.FirstOrDefault();
            return payments != null && payments.IsActive ? _mapper.MapToDto(payments) : null;
        }

        public async Task UpdatePaymentAsync(PaymentDTO paymentDto)
        {
            var existingPayments = await _paymentRepository.GetAllAsync(
                x => x.OrderId == paymentDto.OrderId && x.ClientId == paymentDto.ClientId &&
                x.Amount == paymentDto.Amount && x.PaymentDate == paymentDto.PaymentDate
                && x.IsActive );
            if (existingPayments.Any())
            {
                throw new Exception("Payment already present");
            }
            else
            {
                try
                {
                    var paymentEntity = _mapper.MapToEntity(paymentDto);
                    paymentEntity.IsActive = true;
                    paymentEntity.UpdatedAt = DateTime.Now;
                    paymentEntity.UpdatedBy = _claimsHelper.GetUserIdFromClaims();
                    await _paymentRepository.UpdateAsync(paymentEntity);
                }
                catch (Exception ex)
                {
                    throw new Exception("Error updating payment", ex);
                }
            }
        }

        public async Task DeletePaymentAsync(int paymentId)
        {
            var payment = await _paymentRepository.GetByIdAsync(paymentId);
            if (payment != null)
            {
                payment.IsActive = !payment.IsActive;
                await _paymentRepository.UpdateAsync(payment);
            }
            else
            {
                throw new Exception("Payment not found.");
            }
        }
    }
}
