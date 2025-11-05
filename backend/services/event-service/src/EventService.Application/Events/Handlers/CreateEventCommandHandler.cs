using Cortex.Mediator.Commands;
using EventService.Application.Events.commands;
using EventService.Application.Interfaces;
using EventService.Domain.Events;
using Mapster;
using TS.Result;

namespace EventService.Application.Events.Handlers
{
    public class CreateEventCommandHandler(
        IEventRepository eventRepository,
        IImageService imageService,
        IUnitOfWork unitOfWork)
        : ICommandHandler<CreateEventCommand, Result<Guid>>
    {
        private readonly IEventRepository _eventRepository = eventRepository;
        private readonly IImageService _imageService = imageService;
        private readonly IUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Result<Guid>> Handle(CreateEventCommand command, CancellationToken cancellationToken)
        {
            await _unitOfWork.BeginTransactionAsync();

            // 1️⃣ Event objesini oluştur
            var newEvent = command.Adapt<Event>();

            // 2️⃣ Eğer image varsa ImageKit’e yükle
            if (command.ImageBytes != null && command.ImageBytes.Length > 0)
            {
                // Rastgele dosya adı oluştur
                var fileName = $"{Guid.NewGuid()}.jpg";

                // ImageService aracılığıyla upload et
                var imageUrl = await _imageService.UploadImageAsync(command.ImageBytes, fileName, cancellationToken);

                // Event'in ImageUrl alanını set et
                newEvent.ImageUrl = imageUrl;
            }

            // 3️⃣ Event'i repository'e ekle
            _eventRepository.Add(newEvent);

            // 4️⃣ Katılımcı ekle
            newEvent.AddParticipant(command.OrganizerId ?? throw new ArgumentNullException(nameof(command.OrganizerId)));

            // 5️⃣ Transaction commit
            await _unitOfWork.CommitAsync(cancellationToken);

            return Result<Guid>.Succeed(newEvent.Id);
        }
    }
}