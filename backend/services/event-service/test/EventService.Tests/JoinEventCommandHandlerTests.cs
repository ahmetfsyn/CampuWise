using System.Linq.Expressions;
using EventService.Application;
using EventService.Application.EventParticipants.Commands;
using EventService.Application.Events;
using EventService.Domain.EventParticipants;
using EventService.Domain.EventParticipants.Exceptions;
using EventService.Domain.Events;
using EventService.Domain.Events.Exceptions;
using Moq;

namespace EventService.tests;

public class JoinEventCommandHandlerTests
{
    [Fact]
    public async Task Handle_ShouldThrowEventNotFoundException_WhenEventDoesNotExist()
    {
        // Arrange
        var eventRepoMock = new Mock<IEventRepository>();
        var unitOfWorkMock = new Mock<IUnitOfWork>();

        // Event bulunmazsa null dönüyor
        eventRepoMock
            .Setup(r => r.FirstOrDefaultAsync(
                It.IsAny<Expression<Func<Event, bool>>>(),
                It.IsAny<CancellationToken>(),
                It.IsAny<bool>()))
            .ReturnsAsync((Event)null!);

        var handler = new JoinEventCommandHandler(eventRepoMock.Object, unitOfWorkMock.Object);

        var command = new JoinEventCommand(Guid.NewGuid(), Guid.NewGuid());

        // Act & Assert
        await Assert.ThrowsAsync<EventNotFoundException>(() =>
            handler.Handle(command, CancellationToken.None));
    }

    [Fact]
    public async Task Handle_ShouldAddParticipantAndCommit_WhenEventExists()
    {
        // Arrange
        var unitOfWorkMock = new Mock<IUnitOfWork>();

        var existingEvent = new Event
        {
            Id = Guid.NewGuid(),
            Title = "Test Event"
        };
        var eventRepoMock = new Mock<IEventRepository>();
        eventRepoMock
            .Setup(r => r.FirstOrDefaultAsync(
                It.IsAny<Expression<Func<Event, bool>>>(),
                It.IsAny<CancellationToken>(),
                It.IsAny<bool>()))
            .ReturnsAsync(existingEvent);

        unitOfWorkMock
            .Setup(u => u.CommitAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        var handler = new JoinEventCommandHandler(eventRepoMock.Object, unitOfWorkMock.Object);

        var command = new JoinEventCommand(existingEvent.Id, Guid.NewGuid());

        // Act
        var result = await handler.Handle(command, CancellationToken.None);

        // Assert
        Assert.Contains(command.UserId, existingEvent.Participants.Select(p => p.UserId));
        Assert.True(result.IsSuccessful);
        unitOfWorkMock.Verify(u => u.CommitAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    public class LeaveEventCommandHandlerTests
    {
        [Fact]
        public async Task Handle_ShouldThrowEventNotFoundException_WhenEventDoesNotExist()
        {
            // Arrange
            var eventRepoMock = new Mock<IEventRepository>();
            var unitOfWorkMock = new Mock<IUnitOfWork>();

            // Event bulunmazsa null dönüyor
            var mockQueryable = new List<Event>().AsQueryable();
            eventRepoMock.Setup(r => r.GetAllWithTracking()).Returns(mockQueryable);

            var handler = new LeaveEventCommandHandler(eventRepoMock.Object, unitOfWorkMock.Object);
            var command = new LeaveEventCommand(Guid.NewGuid(), Guid.NewGuid());

            // Act & Assert
            await Assert.ThrowsAsync<EventNotFoundException>(() => handler.Handle(command, CancellationToken.None));
        }

        [Fact]
        public async Task Handle_ShouldThrowParticipantNotFoundException_WhenUserNotParticipant()
        {
            // Arrange
            var eventRepoMock = new Mock<IEventRepository>();
            var unitOfWorkMock = new Mock<IUnitOfWork>();

            var existingEvent = new Event
            {
                Id = Guid.NewGuid(),
                Title = "Sample Event",
                Participants = new List<EventParticipant>() // boş liste = kullanıcı yok
            };

            var mockQueryable = new List<Event> { existingEvent }.AsQueryable();
            eventRepoMock.Setup(r => r.GetAllWithTracking()).Returns(mockQueryable);

            var handler = new LeaveEventCommandHandler(eventRepoMock.Object, unitOfWorkMock.Object);
            var command = new LeaveEventCommand(existingEvent.Id, Guid.NewGuid());

            // Act & Assert
            await Assert.ThrowsAsync<ParticipantNotFoundException>(() =>
                handler.Handle(command, CancellationToken.None));
        }

        [Fact]
        public async Task Handle_ShouldRemoveParticipantAndCommit_WhenUserIsParticipant()
        {
            // Arrange
            var eventRepoMock = new Mock<IEventRepository>();
            var unitOfWorkMock = new Mock<IUnitOfWork>();

            var userId = Guid.NewGuid();
            var existingEvent = new Event
            {
                Id = Guid.NewGuid(),
                Title = "Test Event",
                Participants = new List<EventParticipant>
                {
                    new EventParticipant { EventId = Guid.NewGuid(), UserId = userId }
                }
            };

            var mockQueryable = new List<Event> { existingEvent }.AsQueryable();
            eventRepoMock.Setup(r => r.GetAllWithTracking()).Returns(mockQueryable);

            unitOfWorkMock.Setup(u => u.BeginTransactionAsync()).Returns(Task.CompletedTask);
            unitOfWorkMock.Setup(u => u.CommitAsync(It.IsAny<CancellationToken>())).Returns(Task.CompletedTask);

            var handler = new LeaveEventCommandHandler(eventRepoMock.Object, unitOfWorkMock.Object);
            var command = new LeaveEventCommand(existingEvent.Id, userId);

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.Empty(existingEvent.Participants); // kullanıcı silinmiş olmalı
            Assert.True(result.IsSuccessful);
            unitOfWorkMock.Verify(u => u.CommitAsync(It.IsAny<CancellationToken>()), Times.Once);
        }
    }
}