using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Application.Helpers;
using AlSafeerTraders.Application.Interfaces;
using AlSafeerTraders.Application.Mappers;
using AlSafeerTraders.Domain.Entities;
using AlSafeerTraders.Domain.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace AlSafeerTraders.Application.Services
{
    public class ExpenseService : IExpense
    {
        private readonly IGenericRepository<Expense> _expenseRepository;
        private readonly ExpenseMapper _mapper;
        private readonly ClaimsHelper _claimsHelper;

        public ExpenseService(IGenericRepository<Expense> expenseRepository, ExpenseMapper mapper, ClaimsHelper claimsHelper)
        {
            _expenseRepository = expenseRepository;
            _mapper = mapper;
            _claimsHelper = claimsHelper;
        }

        public async Task AddExpenseAsync(ExpenseDTO dto)
        {
            try
            {

                var expenseEntity = _mapper.MapToEntity(dto);
                expenseEntity.IsActive = true;
                expenseEntity.CreatedAt = DateTime.Now;
                expenseEntity.CreatedBy = _claimsHelper.GetUserIdFromClaims();
                await _expenseRepository.AddAsync(expenseEntity);
            }
            catch (Exception ex)
            {
                throw new Exception("Error adding expense", ex);
            }
        }

        public async Task<List<ExpenseDTO>> GetAllExpensesAsync()
        {
            var expenses = await _expenseRepository.GetAllAsync(
                include: query => query
                .Include(x => x.ClientType)
                );
            //var activeExpenses = expenses.Where(p => p.IsActive);
            var expenseDtos = expenses.Select(p => _mapper.MapToDto(p)).ToList();
            return expenseDtos;
        }

        public async Task<ExpenseDTO> GetExpenseByIdAsync(int expenseId)
        {
            var expense = await _expenseRepository.GetAllAsync(
                 filter: s => s.ExpenseId == expenseId,
                 include: query => query
                 .Include(s => s.ClientType)
                 );
            var expenses = expense.FirstOrDefault();
            return expenses != null && expenses.IsActive ? _mapper.MapToDto(expenses) : null;
        }

        public async Task UpdateExpenseAsync(ExpenseDTO expenseDto)
        {
            try
            {
                var expenseEntity = _mapper.MapToEntity(expenseDto);
                expenseEntity.IsActive = true;
                expenseEntity.UpdatedAt = DateTime.Now;
                expenseEntity.UpdatedBy = _claimsHelper.GetUserIdFromClaims();
                await _expenseRepository.UpdateAsync(expenseEntity);
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating expense", ex);
            }
        }

        public async Task DeleteExpenseAsync(int expenseId)
        {
            var expense = await _expenseRepository.GetByIdAsync(expenseId);
            if (expense != null)
            {
                expense.IsActive = !expense.IsActive;
                await _expenseRepository.UpdateAsync(expense);
            }
            else
            {
                throw new Exception("Expense not found.");
            }
        }

    }
}
