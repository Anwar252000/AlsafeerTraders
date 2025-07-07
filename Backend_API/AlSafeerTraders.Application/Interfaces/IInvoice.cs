using AlSafeerTraders.Application.DTOs;

namespace AlSafeerTraders.Application.Interfaces
{
    public interface IInvoice
    {
        Task<List<InvoiceDTO>> GetAllInvoicesAsync();
        Task<InvoiceDTO> GetInvoiceByIdAsync(int invoiceId);
        Task AddInvoiceAsync(InvoiceDTO invoice);
        Task UpdateInvoiceAsync(InvoiceDTO invoice);
        Task DeleteInvoiceAsync(int invoiceId);

    }
}
