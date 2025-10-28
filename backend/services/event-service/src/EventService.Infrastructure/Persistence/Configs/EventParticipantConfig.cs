using EventService.Domain.EventParticipants;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventService.Infrastructure.Persistence.Configs
{
    public sealed class EventParticipantConfig : IEntityTypeConfiguration<EventParticipant>
    {
        public void Configure(EntityTypeBuilder<EventParticipant> builder)
        {
            builder.HasKey(ep => new { ep.EventId, ep.UserId });

            // Event ile ilişki
            builder.HasOne(ep => ep.Event)
                   .WithMany(e => e.Participants)
                   .HasForeignKey(ep => ep.EventId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasIndex(ep => new { ep.EventId, ep.UserId }).IsUnique();

            // UserId Guid olduğu için ekstra ayar opsiyonel
            builder.Property(ep => ep.UserId)
                   .IsRequired();

        }
    }
}