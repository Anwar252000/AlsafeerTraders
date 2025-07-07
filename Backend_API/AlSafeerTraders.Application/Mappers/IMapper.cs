

namespace AlSafeerTraders.Application.Mappers
{
    public interface IMapper<TDto, TEntity>
    {
        TDto MapToDto(TEntity entity);
        TEntity MapToEntity(TDto dto);
        List<TEntity> MapToEntities(TDto dto);
    }
}
