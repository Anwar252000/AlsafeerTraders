using AlSafeerTraders.Application.DTOs;
using AlSafeerTraders.Application.Interfaces;
using AlSafeerTraders.Application.Mappers;
using AlSafeerTraders.Domain.Entities;
using AlSafeerTraders.Domain.Interface;
using AlSafeerTraders.Application.Helpers;


namespace AlSafeerTraders.Application.Services
{
    public class PermissionService : IPermission
    {
        private readonly IGenericRepository<Permission> _permissionRepository;
        private readonly PermissionMapper _mapper;
        private readonly ClaimsHelper _claimsHelper;
        public PermissionService(IGenericRepository<Permission> permissionRepository, PermissionMapper mapper, ClaimsHelper claimsHelper)
        {
            _permissionRepository = permissionRepository;
            _mapper = mapper;
            _claimsHelper = claimsHelper;
        }
            public async Task<object> AddPermissionAsync(PermissionDTO dto)
            {
                var model = _mapper.MapToEntity(dto);
                model.IsActive = true;
                model.CreatedAt = DateTime.Now;
                model.CreatedBy = _claimsHelper.GetUserIdFromClaims();
                return await _permissionRepository.AddAsync(model);
            }

            public async Task<List<PermissionDTO>> GetAllPermissionsAsync()
            {
                var users = await _permissionRepository.GetAllAsync();
                //var activeUsers = users.Where(u => u.IsActive);
                var lst = users.Select(_mapper.MapToDto).ToList();
                return lst;
            }

          
            public async Task DeletePermissionAsync(int permissionId)
            {
                var user = await _permissionRepository.GetByIdAsync(permissionId);
                if (user != null)
                {
                    user.IsActive = !user.IsActive;
                    await _permissionRepository.UpdateAsync(user);
                }
            else
            {
                throw new Exception("Permission not found.");
            }
        }

            public async Task UpdatePermissionAsync(PermissionDTO dto)
            {
                //var model = _mapper.MapToEntity(dto);
                var model = await _permissionRepository.GetByIdAsync((int)dto.PermissionId);
                model.PermissionId = dto.PermissionId;
                model.PermissionKey = dto.PermissionKey;
                model.IsActive = true;
                model.UpdatedAt = DateTime.Now;
                model.UpdatedBy = _claimsHelper.GetUserIdFromClaims();
                await _permissionRepository.UpdateAsync(model);
            }

        public async Task<PermissionDTO> GetPermissionByIdAsync(int permissionId)
        {
            var user = await _permissionRepository.GetByIdAsync(permissionId);
            //var users = user.FirstOrDefault();
            return user != null && user.IsActive ? _mapper.MapToDto(user) : null;
        }
    }
}
