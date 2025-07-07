using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Application.Helpers;
using AlSafeerTraders.Application.Interfaces;
using AlSafeerTraders.Application.Mappers;
using AlSafeerTraders.Domain.Entities;
using AlSafeerTraders.Domain.Interface;
using Microsoft.EntityFrameworkCore;


namespace AlSafeerTraders.Application.Services
{
    public class InvoiceService : IInvoice
    {
        private readonly IGenericRepository<Invoice> _invoiceRepository;
        private readonly InvoiceMapper _mapper;
        private readonly ClaimsHelper _claimsHelper;

        public InvoiceService(IGenericRepository<Invoice> invoiceRepository, InvoiceMapper mapper, ClaimsHelper claimsHelper)
        {
            _invoiceRepository = invoiceRepository;
            _mapper = mapper;
            _claimsHelper = claimsHelper;
        }

        public async Task AddInvoiceAsync(InvoiceDTO invoice)
        {
            var existingInvoice = await _invoiceRepository.GetAllAsync(
                x => x.OrderId == invoice.OrderId && x.ClientId == invoice.ClientId && 
                x.InvoiceAmount == invoice.InvoiceAmount && x.InvoiceDate == invoice.InvoiceDate
                && x.IsActive );
            if (existingInvoice.Any())
            {
                throw new Exception("Invoice already present");
            }
            else { 
            try
            {
                var invoiceEntity = _mapper.MapToEntity(invoice);
                invoiceEntity.IsActive = true;
                invoiceEntity.CreatedAt = DateTime.Now;
                invoiceEntity.CreatedBy = _claimsHelper.GetUserIdFromClaims();
                _invoiceRepository.AddAsync(invoiceEntity);
            }
            catch (Exception ex)
            {
                throw new Exception("Error adding invoice", ex);
            }
            }
        }

        public async Task<List<InvoiceDTO>> GetAllInvoicesAsync()
        {
            var invoices = await _invoiceRepository.GetAllAsync(
                include: query => query
                .Include(x => x.Client)
                .ThenInclude(x => x.ClientType)
                .Include(x => x.Order)
                );
            //var activeInvoices = invoices.Where(i => i.IsActive);
            var invoiceDtos = invoices.Select(i => _mapper.MapToDto(i)).ToList();
            return invoiceDtos;
        }

        public async Task<InvoiceDTO> GetInvoiceByIdAsync(int invoiceId)
        {
            var invoices = await _invoiceRepository.GetAllAsync(
                 filter: s => s.InvoiceId == invoiceId,
                 include: query => query
                 .Include(s => s.Client)
                 .ThenInclude(x => x.ClientType)
                 .Include(x => x.Order)
                 );

            var invoice = invoices.FirstOrDefault();
            return invoice != null && invoice.IsActive ? _mapper.MapToDto(invoice) : null;
        }

        public async Task UpdateInvoiceAsync(InvoiceDTO invoice)
        {
            var existingInvoice = await _invoiceRepository.GetAllAsync(
                x => x.OrderId == invoice.OrderId && x.ClientId == invoice.ClientId &&
                x.InvoiceAmount == invoice.InvoiceAmount && x.InvoiceDate == invoice.InvoiceDate
                && x.IsActive );
            if (existingInvoice.Any())
            {
                throw new Exception("Invoice already present");
            }
            else
            {
                try
                {
                    var invoiceEntity = _mapper.MapToEntity(invoice);
                    invoiceEntity.IsActive = true;
                    invoiceEntity.UpdatedAt = DateTime.Now;
                    invoiceEntity.UpdatedBy = _claimsHelper.GetUserIdFromClaims();
                    await _invoiceRepository.UpdateAsync(invoiceEntity);
                }
                catch (Exception ex)
                {
                    throw new Exception("Error updating invoice", ex);
                }
            }
        }

        public async Task DeleteInvoiceAsync(int invoiceId)
        {
            var invoice = await _invoiceRepository.GetByIdAsync(invoiceId);
            if (invoice != null)
            {
                invoice.IsActive = !invoice.IsActive;
                await _invoiceRepository.UpdateAsync(invoice);
            }
            else
            {
                throw new Exception("Invoice not found.");
            }
        }
    }
}
