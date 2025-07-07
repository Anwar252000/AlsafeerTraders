using AlSafeerTraders.Application.DTOs;

namespace AlSafeerTraders.Application.Interfaces
{
    public interface IPayment
    {
        Task<List<PaymentDTO>> GetAllPaymentsAsync();
        Task<PaymentDTO> GetPaymentByIdAsync(int paymentId);
        Task AddPaymentAsync(PaymentDTO payment);
        Task UpdatePaymentAsync(PaymentDTO payment);
        Task DeletePaymentAsync(int paymentId);

    }
}
