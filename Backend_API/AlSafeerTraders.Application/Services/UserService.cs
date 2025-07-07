using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Application.Interfaces;
using AlSafeerTraders.Application.Mappers;
using AlSafeerTraders.Domain.Entities;
using AlSafeerTraders.Domain.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using AlSafeerTraders.Application.Helpers;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;


namespace AlSafeerTraders.Application.Services
{
    public class UserService : IUser
    {
        private readonly IGenericRepository<User> _userRepository;
        private readonly PasswordHasher<User> _passwordHasher;
        private readonly UserMapper _mapper;
        private readonly ClaimsHelper _claimsHelper;
        public UserService(IGenericRepository<User> userRepository, UserMapper mapper, ClaimsHelper claimsHelper)
        {
            _userRepository = userRepository;
            _passwordHasher = new PasswordHasher<User>();
            _mapper = mapper;
            _claimsHelper = claimsHelper;
        }
        public async Task<object> AddUserAsync(UserDTO dto)
        {
            var allUsers = await _userRepository.GetAllAsync(
                x => x.Username == dto.Username && x.IsActive);

            if (allUsers.Any())
            {
                throw new Exception("User already added");
            }
            else {
                var model = _mapper.MapToEntity(dto);
                model.Password = _passwordHasher.HashPassword(model, dto.Password);
                model.IsActive = true;
                model.CreatedAt = DateTime.Now;
                model.CreatedBy = _claimsHelper.GetUserIdFromClaims();
                return await _userRepository.AddAsync(model);
            }
        }

            public async Task<List<UserDTO>> GetAllUsersAsync()
            {
                var users = await _userRepository.GetAllAsync(
                    include: query => query
                    .Include(r => r.UserRole));
                //var activeUsers = users.Where(u => u.IsActive);
                var lst = users.Select(_mapper.MapToDto).ToList();
                return lst;
            }

            public async Task<UserDTO> ValidUser(LoginDTO dto)
            {
                try
                {
                    var users = await _userRepository.GetAllAsync(
                    include: query => query.Include(query => query.UserRole)
                    );
                   
                    var filteredUser = users.FirstOrDefault(x => x.Username == dto.Username);

                    if (filteredUser == null)
                    {
                        throw new UnauthorizedAccessException("Invalid username or password.");
                    }

                    if (string.IsNullOrEmpty(filteredUser.Password))
                    {
                        throw new UnauthorizedAccessException("Invalid username or password.");
                    }

                    var passwordVerificationResult = _passwordHasher.VerifyHashedPassword(filteredUser, filteredUser.Password, dto.Password);

                    if (passwordVerificationResult == PasswordVerificationResult.Failed)
                    {
                        throw new UnauthorizedAccessException("Invalid username or password.");
                    }

                    return _mapper.MapToDto(filteredUser);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

            public async Task DeleteUserAsync(int userId)
            {
                var user = await _userRepository.GetByIdAsync(userId);
                if (user != null)
                {
                    user.IsActive = !user.IsActive;
                    await _userRepository.UpdateAsync(user);
                }
                else
                {
                    throw new Exception("User not found.");
                }
        }

        public async Task UpdateUserAsync(UserDTO dto)
        {
            var model = await _userRepository.GetByIdAsync((int)dto.UserId);

            if (model == null)
            {
                throw new Exception("User not found");
            }

            model.RoleId = dto.RoleId;
            model.UserId = dto.UserId;
            model.Username = dto.Username;
            model.Name = dto.Name;

            if (!string.IsNullOrEmpty(dto.Password))
            {
                model.Password = _passwordHasher.HashPassword(model, dto.Password);
            }

            model.UpdatedAt = DateTime.Now;
            model.UpdatedBy = _claimsHelper.GetUserIdFromClaims();

            await _userRepository.UpdateAsync(model);
        }


        public async Task<UserDTO> GetUserByIdAsync(int userId)
        {
            var user = await _userRepository.GetAllAsync(
                 filter: s => s.UserId == userId,
                 include: query => query
                 .Include(s => s.UserRole));
            var users = user.FirstOrDefault();
            return users != null && users.IsActive ? _mapper.MapToDto(users) : null;
        }

        public async Task ResetPasswordAsync(ResetPasswordDTO dto)
        {
            var user = await _userRepository.GetByIdAsync((int)dto.UserId);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            if (!string.IsNullOrEmpty(dto.OldPassword))
            {
                var verificationResult = _passwordHasher.VerifyHashedPassword(user, user.Password, dto.OldPassword);
                if (verificationResult != PasswordVerificationResult.Success)
                    throw new Exception("Old password is incorrect");
            }
            user.Password = _passwordHasher.HashPassword(user, dto.NewPassword);
            await _userRepository.UpdateAsync(user);
        }
    }
}
