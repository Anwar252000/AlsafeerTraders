using Microsoft.EntityFrameworkCore;
using AlSafeerTraders.Domain.Entities;
using Microsoft.EntityFrameworkCore.Internal;

namespace AlSafeerTraders.Infrastructure.Data
{
    public class AlSafeerContext : DbContext
    {
        public AlSafeerContext(DbContextOptions<AlSafeerContext> options) : base(options)
        {
        }

        public DbSet<Client> Clients { get; set; }
        public DbSet<ClientType> ClientTypes { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Shipment> Shipments { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<UserPermission> UserPermissions { get; set; }
        public DbSet<UserPermissionView> UserPermissionView {  get; set; } 

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<UserPermissionView>().HasNoKey();

            base.OnModelCreating(modelBuilder);
        }
    }
}
