using AlSafeerTraders.Application.DTOs;

namespace AlSafeerTraders.Application.Interfaces
{
    public interface IExpense
    {
        Task<List<ExpenseDTO>> GetAllExpensesAsync();
        Task<ExpenseDTO> GetExpenseByIdAsync(int expenseId);
        Task AddExpenseAsync(ExpenseDTO expense);
        Task UpdateExpenseAsync(ExpenseDTO expense);
        Task DeleteExpenseAsync(int expenseId);
    }
}
