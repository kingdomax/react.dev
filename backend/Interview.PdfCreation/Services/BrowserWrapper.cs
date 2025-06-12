using Microsoft.Playwright;

namespace Interview.PdfCreation.Services;

public class BrowserWrapper : IBrowserWrapper
{
    private IPlaywright? _playwright;
    private Lazy<Task<IBrowser>> _browser;
    public BrowserWrapper()
    {
        _browser = new Lazy<Task<IBrowser>>(InitializeBrowser, false);
    }

    private async Task<IBrowser> InitializeBrowser()
    {
        _playwright = await Playwright.CreateAsync();
        var options = new BrowserTypeLaunchOptions { Headless = false };
        return await _playwright.Chromium.LaunchAsync(options);
    }
    public async Task<IPage> GetPage()
    {
        var browser = await _browser.Value;
        return await browser.NewPageAsync(new BrowserNewPageOptions() { Locale = "en-US"});
    }
}
