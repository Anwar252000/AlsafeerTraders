using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Application.Helpers;
using AlSafeerTraders.Application.Interfaces;
using AlSafeerTraders.Application.Mappers;
using AlSafeerTraders.Domain.Entities;
using AlSafeerTraders.Domain.Interface;

namespace AlSafeerTraders.Application.Services
{
    public class UserRoleService : IUserRole
    {
        private readonly IGenericRepository<UserRole> _userRoleRepository;
        private readonly UserRoleMapper _mapper;
        private readonly ClaimsHelper _claimsHelper;

        public UserRoleService(IGenericRepository<UserRole> userRoleRepository, UserRoleMapper mapper, ClaimsHelper claimsHelper)
        {
            _userRoleRepository = userRoleRepository;
            _mapper = mapper;
            _claimsHelper = claimsHelper;
        }

        public async Task AddUserRoleAsync(UserRoleDTO dto)
        {
            try
            {
                var userRoleEntity = _mapper.MapToEntity(dto);
                userRoleEntity.IsActive = true;
                userRoleEntity.CreatedAt = DateTime.Now;
                userRoleEntity.CreatedBy = _claimsHelper.GetUserIdFromClaims();
                await _userRoleRepository.AddAsync(userRoleEntity);
            }
            catch (Exception ex)
            {
                throw new Exception("Error adding user role", ex);
            }
        }

        public async Task<List<UserRoleDTO>> GetAllUserRolesAsync()
        {
            var userRoles = await _userRoleRepository.GetAllAsync();
            var activeUserRoles = userRoles.Where(u => (bool)u.IsActive);
            var userRoleDtos = activeUserRoles.Select(ur => _mapper.MapToDto(ur)).ToList();
            return userRoleDtos;
        }

        public async Task<UserRoleDTO> GetUserRoleByIdAsync(int userRoleId)
        {
            var userrole = await _userRoleRepository.GetByIdAsync(userRoleId);
            return userrole != null && (bool)userrole.IsActive ? _mapper.MapToDto(userrole) : null;

            //// Return null if userrole is null
            //if (userrole == null)
            //{
            //    return null;
            //}

            //// Return null if userrole is not active
            //if ((bool)!userrole.IsActive)
            //{
            //    return null;
            //}

            //// If userrole is not null and active, map and return it
            //return _mapper.MapToDto(userrole);
        }

        public async Task UpdateUserRoleAsync(UserRoleDTO userRoleDto)
        {
            try
            {
                var userRoleEntity = _mapper.MapToEntity(userRoleDto);
                userRoleEntity.UpdatedAt = DateTime.Now;
                userRoleEntity.UpdatedBy = _claimsHelper.GetUserIdFromClaims();
                await _userRoleRepository.UpdateAsync(userRoleEntity);
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating user role", ex);
            }
        }

        public async Task DeleteUserRoleAsync(int roleId)
        {
            var userRole = await _userRoleRepository.GetByIdAsync(roleId);
            if (userRole != null)
            {
                userRole.IsActive = false;
                await _userRoleRepository.UpdateAsync(userRole);
            }
        }
    }
}
