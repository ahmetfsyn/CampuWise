namespace EventService.Domain.Common
{
    public abstract class BaseEntity
    {
        public BaseEntity()
        {
            Id = Guid.CreateVersion7();
        }
        public Guid Id { get; set; }

        public bool IsActive { get; set; } = true;
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
        public DateTimeOffset? UpdatedAt { get; set; }
        public DateTimeOffset? DeletedAt { get; set; }

        public void MarkUpdated()
        {
            UpdatedAt = DateTimeOffset.UtcNow;
        }

        // ✅ Entity soft delete edildiğinde çağır
        public void MarkDeleted()
        {
            IsActive = false;
            DeletedAt = DateTimeOffset.UtcNow;
        }

    }
}