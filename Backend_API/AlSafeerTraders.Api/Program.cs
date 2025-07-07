using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using AlSafeerTraders.API.Middleware;
using AlSafeerTraders.Infrastructure.Data;
using AlSafeerTraders.Domain.Interface;
using AlSafeerTraders.Infrastructure.Repositories;
using AlSafeerTraders.Application.Interfaces;
using AlSafeerTraders.Application.Services;
using AlSafeerTraders.Application.Mappers;
using System.Globalization;
using AlSafeerTraders.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AlSafeerTraders.Application.Helpers;

var builder = WebApplication.CreateBuilder(args);

CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("en-US");
CultureInfo.DefaultThreadCurrentUICulture = new CultureInfo("en-US");

// Disable invariant globalization mode if it's enabled by default in your environment
//AppContext.SetSwitch("System.Globalization.Invariant", false);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();

        policy.WithOrigins(allowedOrigins)
        //builder.WithOrigins("http://localhost:5173")
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials();
    });
});

builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters { 
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidateLifetime = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["Jwt:key"])),
            ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

builder.Services.AddHttpContextAccessor();

// Configure logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole(); // Logs to console
builder.Logging.AddDebug();   // Logs to debug window

// Configure services
builder.Services.AddDbContext<AlSafeerContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register the generic repository
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));


builder.Services.AddScoped<IClient, ClientService>();
builder.Services.AddScoped<ClientMapper>();

builder.Services.AddScoped<IClientType, ClientTypeService>();
builder.Services.AddScoped<ClientTypeMapper>();

builder.Services.AddScoped<IInvoice, InvoiceService>();
builder.Services.AddScoped<InvoiceMapper>();

builder.Services.AddScoped<IOrder, OrderService>();
builder.Services.AddScoped<OrderMapper>();

builder.Services.AddScoped<IPayment, PaymentService>();
builder.Services.AddScoped<PaymentMapper>();

builder.Services.AddScoped<IProduct, ProductService>();
builder.Services.AddScoped<ProductMapper>();

builder.Services.AddScoped<IShipment, ShipmentService>();
builder.Services.AddScoped<ShipmentMapper>();

builder.Services.AddScoped<IUser, UserService>();
builder.Services.AddScoped<UserMapper>();

builder.Services.AddScoped<IUserRole, UserRoleService>();
builder.Services.AddScoped<UserRoleMapper>();

builder.Services.AddScoped<IExpense, ExpenseService>();
builder.Services.AddScoped<ExpenseMapper>();

builder.Services.AddScoped<IPermission, PermissionService>();
builder.Services.AddScoped<PermissionMapper>();

builder.Services.AddScoped<IUserPermission, UserPermissionService>();
builder.Services.AddScoped<UserPermissionMapper>();
builder.Services.AddScoped<UserPermissionViewMapper>();

builder.Services.AddScoped<ClaimsHelper>();

// Add controllers
builder.Services.AddControllers();

// JWT Authention
//builder.Services.AddAuthentication(options =>
//{
//    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//})
//.AddJwtBearer(options =>
//{
//    options.TokenValidationParameters = new TokenValidationParameters
//    {
//        ValidateIssuer = true,
//        ValidateAudience = true,
//        ValidateLifetime = true,
//        ValidateIssuerSigningKey = true,
//        ValidIssuer = builder.Configuration["Jwt:Issuer"],
//        ValidAudience = builder.Configuration["Jwt:Audience"],
//        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
//    };
//});

builder.Services.AddEndpointsApiExplorer();  // Adds support for minimal APIs
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Al Safeer Traders", Version = "v1" });
});

// Add other services and middleware configurations if needed
// builder.Host.UseSerilog((context, config) => { config.ReadFrom.Configuration(context.Configuration); });

// builder.Services.AddAutoMapper(typeof(Program)); // Example for AutoMapper

// Configure CORS
//builder.Services.AddCors(options =>
//{
//    options.AddDefaultPolicy(policy =>
//    {
//        policy.WithOrigins(builder.Configuration.GetSection("AllowedOrigins").Get<string[]>()).AllowAnyHeader().AllowAnyMethod();
//    });
//});



var app = builder.Build();

// Seed the database with default data
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AlSafeerContext>();
    SeedDefaultData(context);
}

// Configure middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseStaticFiles();   
// Enable CORS
app.UseCors();

// Add custom error-handling middleware
app.UseMiddleware<ErrorHandlerMiddleware>();

//app.UseCors("AllowLocalhost3000");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
//app.UseExceptionHandler("/Home/Error"); // For production
app.UseDeveloperExceptionPage(); // Server Side Exception (For development)
app.Run();


//Method for Default Data
void SeedDefaultData(AlSafeerContext context)
{
    if (!context.UserRoles.Any())
    {
         var roles = new List<UserRole>
        {
            new UserRole
            {
                RoleName = "Admin",
                CreatedAt = DateTime.Now,
                IsActive = true
            },
            new UserRole
            {
                RoleName = "User",
                CreatedAt = DateTime.Now,
                IsActive = true
            },
        };

            context.UserRoles.AddRange(roles);
            context.SaveChanges();
    }

    var adminRoleId = context.UserRoles
        .Where(r => r.RoleName == "Admin")
        .Select(r => r.RoleId)
        .FirstOrDefault();

    if (!context.Users.Any())
    {
        var passwordHasher = new PasswordHasher<User>();

        var defaultUser = new User
        {
            Name = "Admin",
            Username = "admin123",
            Password = passwordHasher.HashPassword(null, "admin"), 
            RoleId = adminRoleId,
            IsActive = true,
            CreatedAt = DateTime.Now,
            CreatedBy = 1,
        };
        context.Users.Add(defaultUser);
        context.SaveChanges();
    }

    var adminUserId = context.Users
        .Where(u => u.Username == "admin123")
        .Select(u => u.UserId)
        .FirstOrDefault();

    if (adminUserId != 0)
    {
        var adminRole = context.UserRoles
            .FirstOrDefault(r => r.RoleName == "Admin");

        if (adminRole != null)
        {
            adminRole.CreatedBy = (int)adminUserId;
            context.UserRoles.Update(adminRole);
        }

        var userRole = context.UserRoles
            .FirstOrDefault(r => r.RoleName == "User");

        if (userRole != null)
        {
            userRole.CreatedBy = (int)adminUserId;
            context.UserRoles.Update(userRole);
        }

        var adminUser = context.Users
            .FirstOrDefault(u => u.Username == "admin123");

        if (adminUser != null)
        {
            adminUser.CreatedBy = (int)adminUserId;
            context.Users.Update(adminUser);
        }

        context.SaveChanges();
    }


    if (!context.Permissions.Any())
    {
        //var adminUserId = context.Users
        //    .Where(u => u.Username == "admin123")
        //    .Select(u => u.UserId)
        //    .FirstOrDefault();

        var permissions = new List<Permission>
        {
            new Permission { PermissionKey = "add-user", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "user-list", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "update-user", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "add-permission", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "permission-list", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "add-client", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "add-client-type", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "client-list", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "update-client", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "client-type-list", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "update-client-type", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "permissions", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "user-permissions", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "update-permission", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "add-product", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "product-list", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "update-product", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "add-shipment", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "shipment-list", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "update-shipment", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "add-order", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "order-list", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "update-order", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "add-expense", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "expense-list", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "update-expense", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "add-payment", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "payment-list", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "update-payment", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "add-invoice", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "invoice-list", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "update-invoice", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
            new Permission { PermissionKey = "change-password", IsActive = true, CreatedBy = (int)adminUserId, CreatedAt = DateTime.UtcNow },
        };

        context.Permissions.AddRange(permissions);
        context.SaveChanges();
    }

    // Assign all permissions to admin user
    if (!context.UserPermissions.Any())
    {
        //var adminUserId = context.Users
        //    .Where(u => u.Username == "admin123")
        //    .Select(u => u.UserId)
        //    .FirstOrDefault();

        var allPermissions = context.Permissions.ToList();

        foreach (var permission in allPermissions)
        {
            var userPermission = new UserPermission
            {
                UserId = (int)adminUserId,
                PermissionId = permission.PermissionId,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = (int)adminUserId
            };

            context.UserPermissions.Add(userPermission);
        }

        context.SaveChanges();
    }
}

