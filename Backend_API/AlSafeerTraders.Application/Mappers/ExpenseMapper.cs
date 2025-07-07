using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Domain.Entities;

namespace AlSafeerTraders.Application.Mappers
{
    public class ExpenseMapper : IMapper<ExpenseDTO, Expense>
    {
        public Expense MapToEntity(ExpenseDTO dto)
        {
            return new Expense
            {
                ExpenseId = dto.ExpenseId,
                ExpenseType = dto.ExpenseType,
                ClientTypeId = dto.ClientTypeId,
                Amount = dto.Amount,
                Picture = dto.Picture,
                Status = dto.Status,
            };
        }

        public ExpenseDTO MapToDto(Expense entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            return new ExpenseDTO
            {
                ExpenseId = entity.ExpenseId,
                ExpenseType = entity.ExpenseType,
                ClientTypeId = entity.ClientTypeId,
                ClientTypeName = entity.ClientType.ClientTypeName,
                Amount = entity.Amount,
                Picture = entity.Picture,
                Status = entity.Status,
                IsActive = entity.IsActive,
            };
        }

        public List<Expense> MapToEntities(ExpenseDTO dto)
        {
            throw new NotImplementedException();
        }
    }
}
