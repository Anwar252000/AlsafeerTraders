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
using AlSafeerTraders.Infrastructure.Data;
using Microsoft.Data.SqlClient;
using System.Collections.Frozen;

namespace AlSafeerTraders.Application.Services
{
    public class UserPermissionService : IUserPermission
    {
        private readonly IGenericRepository<UserPermission> _userPermissionRepository;
        private readonly IGenericRepository<UserPermissionView> _userPermissionViewRepository;
        private readonly UserPermissionMapper _mapper;
        private readonly UserPermissionViewMapper _viewMapper;
        private readonly ClaimsHelper _claimsHelper;
        private readonly AlSafeerContext _context;
        public UserPermissionService(IGenericRepository<UserPermission> userPermissionRepository, IGenericRepository<UserPermissionView> userPermissionViewRepository, UserPermissionMapper mapper, ClaimsHelper claimsHelper, UserPermissionViewMapper viewMapper, AlSafeerContext context)
        {
            _userPermissionRepository = userPermissionRepository;
            _userPermissionViewRepository = userPermissionViewRepository;
            _mapper = mapper;
            _claimsHelper = claimsHelper;
            _viewMapper = viewMapper;
            _context = context;
        }
        public async Task<object> AddUserPermissionAsync(AddUserPermissionDTO dto)
        {
            var existingPermissions = await _userPermissionRepository.GetAllAsync(f => f.UserId == dto.UserId);

            //var models = _mapper.MapToEntities(dto);
            foreach (var permissionId in dto.PermissionIds)
            {
                if (existingPermissions.FirstOrDefault(ep => ep.PermissionId == permissionId) == null)
                {

                    var entity = new UserPermission
                    {
                        UserId = dto.UserId,
                        PermissionId = permissionId,
                        IsActive = true,
                        CreatedAt = DateTime.UtcNow,
                        CreatedBy = _claimsHelper.GetUserIdFromClaims()
                    };
                    await _userPermissionRepository.AddAsync(entity);
                }
            }

            foreach (var permission in existingPermissions)
            {
                if(!dto.PermissionIds.Exists(pid => pid == permission.PermissionId))
                {
                    await _userPermissionRepository.DeleteAsync(permission.UserPermissionId);
                }
            }


            return new { Success = true, Message = "User permissions added successfully" };
        }

            public async Task<List<UserPermissionDTO>> GetAllUserPermissionsAsync()
            {
                var users = await _userPermissionRepository.GetAllAsync(
                    include: query => query
                    .Include(r => r.Permissions)
                    .Include(u => u.Users));
                var activeUsers = users.Where(u => u.IsActive);
                var lst = activeUsers.Select(_mapper.MapToDto).ToList();
                return lst;
            }

        public async Task<List<UserPermissionViewDTO>> GetUserPermissionAsync(int userId)
        {
            //var users = await _userPermissionViewRepository.GetAllAsync();
            //var activeUsers = users.Where(u => u.IsActive);
            var sqlParameter = new SqlParameter("@userId", userId);
            var result = await _context.UserPermissionView
                .FromSqlRaw("EXEC GetUserPermissons_st @userId", sqlParameter)
                .ToListAsync();

            var list = result.Select(x =>_viewMapper.MapToDto(x)).ToList();
            return list;
        }


        public async Task DeleteUserPermissionAsync(int userPermissionId)
            {
                var user = await _userPermissionRepository.GetByIdAsync(userPermissionId);
                if (user != null)
                {
                    user.IsActive = !user.IsActive;
                    await _userPermissionRepository.UpdateAsync(user);
                }
            }

            public async Task UpdateUserPermissionAsync(UserPermissionDTO dto)
            {
                //var model = _mapper.MapToEntity(dto);
                var model = await _userPermissionRepository.GetByIdAsync((int)dto.UserId);
                model.UserPermissionId = dto.UserPermissionId;
                model.UserId = dto.UserId;
                //model.PermissionId = dto.PermissionId;
                model.UpdatedAt = DateTime.Now;
                model.UpdatedBy = _claimsHelper.GetUserIdFromClaims();
                await _userPermissionRepository.UpdateAsync(model);
            }

        public async Task<UserPermissionDTO> GetUserPermissionByIdAsync(int userPermissionId)
        {
            var user = await _userPermissionRepository.GetAllAsync(
                 filter: s => s.UserId == userPermissionId,
                 include: query => query
                 .Include(s => s.Users)
                 .Include(p => p.Permissions));
            var users = user.FirstOrDefault();
            return users != null && users.IsActive ? _mapper.MapToDto(users) : null;
        }
    }
}
