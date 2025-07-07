using Microsoft.EntityFrameworkCore.Query;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using AlSafeerTraders.Infrastructure.Data;
using AlSafeerTraders.Domain.Interface;

namespace AlSafeerTraders.Infrastructure.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly AlSafeerContext _context;
        private readonly DbSet<T> _dbSet;

        public GenericRepository(AlSafeerContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync() ?? new List<T>();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<object> AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();

            // Use reflection to get the ID property value
            return entity.GetType().GetProperty(entity.GetType().Name + "Id")?.GetValue(entity);
        }

        public async Task<object> UpdateAsync(T entity)
        {
            var entityType = entity.GetType();

            PropertyInfo keyProperty;
            if (entityType.Name == "AdmissionApplication")
            {
                keyProperty = entityType.GetProperty("ApplicationId");
            }

            else if (entityType.Name == "EmployeeRole" || entityType.Name == "UserRole")
            {
                keyProperty = entityType.GetProperty("RoleId");
            }
            else
            {
                // Use default convention: ClassName + "Id"
                keyProperty = entityType.GetProperty(entityType.Name + "Id");
            }

            // Get the value of the primary key
            var key = keyProperty?.GetValue(entity);

            if (key == null)
            {
                throw new ArgumentException("Entity key is not set.");
            }

            // Attach and update the entity
            _dbSet.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return key;
        }


        public async Task DeleteAsync(int id)
        {
            var entity = await GetByIdAsync(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(T entity)
        {
            if (entity != null)
            {
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> filter = null,
                          Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null)
        {
            IQueryable<T> query = _dbSet;

            if (include != null)
            {
                query = include(query);
            }

            if (filter != null)
            {
                query = query.Where(filter);
            }

            return await query.ToListAsync();
        }

        public Task UpdateAsync(int appId, T entity)
        {
            throw new NotImplementedException();
        }
    }
}
