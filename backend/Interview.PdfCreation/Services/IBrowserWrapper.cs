using Microsoft.Playwright;

namespace Interview.PdfCreation.Services;
public interface IBrowserWrapper
{
    Task<IPage> GetPage();
}