

namespace EventService.Application
{
    public interface IUnitOfWork : IDisposable
    {
        Task BeginTransactionAsync();
        Task CommitAsync(CancellationToken cancellationToken = default);
        Task RollbackAsync();
    }
}