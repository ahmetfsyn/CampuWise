using System.Reflection;
using EventService.Domain.EventParticipants;
using EventService.Domain.Events;
using Microsoft.EntityFrameworkCore;

namespace EventService.Infrastructure.Persistence;

public class EventDbContext(DbContextOptions<EventDbContext> options) : DbContext(options)
{

    public DbSet<Event> Events { get; set; } = default!;
    public DbSet<EventParticipant> EventParticipants { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

    }
}