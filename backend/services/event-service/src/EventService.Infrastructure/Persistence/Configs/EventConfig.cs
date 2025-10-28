using EventService.Domain.Events;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventService.Infrastructure.Persistence.Configs
{
    public sealed class EventConfig : IEntityTypeConfiguration<Event>
    {
        public void Configure(EntityTypeBuilder<Event> builder)
        {

            builder.HasKey(e => e.Id);


            builder
                   .Property(e => e.Category)
                   .HasConversion<string>();

            builder.HasMany(e => e.Participants)
                   .WithOne(p => p.Event)
                   .HasForeignKey(p => p.EventId)
                   .OnDelete(DeleteBehavior.Cascade);


        }
    }
}