namespace EventService.Application.Interfaces
{
    public interface IImageService
    {
        /// <summary>
        /// Resmi byte dizisi olarak alır ve dış servise yükleyip URL döner.
        /// </summary>
        /// <param name="imageBytes">Yüklenecek resmin byte dizisi</param>
        /// <param name="fileName">Opsiyonel dosya adı</param>
        /// <param name="cancellationToken">İptal tokeni</param>
        /// <returns>Yüklenen resmin erişim URL'si</returns>
        Task<string> UploadImageAsync(byte[] imageBytes, string fileName, CancellationToken cancellationToken = default);
    }
}