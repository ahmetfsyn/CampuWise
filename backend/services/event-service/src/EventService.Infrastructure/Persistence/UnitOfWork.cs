using EventService.Application;
using Microsoft.EntityFrameworkCore.Storage;

namespace EventService.Infrastructure.Persistence
{
    public class UnitOfWork(EventDbContext context) : IUnitOfWork
    {
        private readonly EventDbContext _context = context;
        private IDbContextTransaction? _transaction;

        public async Task BeginTransactionAsync() => _transaction = await _context.Database.BeginTransactionAsync();

        public async Task CommitAsync(CancellationToken ct = default)
        {
            await _context.SaveChangesAsync(ct);
            if (_transaction != null) await _transaction.CommitAsync(ct);
        }

        public async Task RollbackAsync()
        {
            if (_transaction != null) await _transaction.RollbackAsync();
        }

        public void Dispose() => _transaction?.Dispose();
    }
}