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
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

        public void MarkUpdated()
        {
            UpdatedAt = DateTime.UtcNow;
        }

        // ✅ Entity soft delete edildiğinde çağır
        public void MarkDeleted()
        {
            IsActive = false;
            DeletedAt = DateTime.UtcNow;
        }

    }
}