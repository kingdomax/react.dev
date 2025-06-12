using Interview.PdfCreation.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Playwright;
using System.Net.Mime;

namespace Interview.PdfCreation.Features.RenderCityMap;

public static class RenderCityMapEndpoint
{
    public static async Task<FileContentHttpResult> Execute(string name, IBrowserWrapper browserWrapper)
    {
        var cityEncoded = name.Replace(" ", "%2B");
        var page = await browserWrapper.GetPage();
        await page.GotoAsync("https://consent.google.com/m?continue=https://www.google.com/maps/place/" + cityEncoded + "&gl=DE&m=0&pc=m&uxe=eomtm&cm=2&hl=en&src=1");

        if (!page.Url.StartsWith("https://www.google.com/maps/place"))
        {
            await page.GetByRole(AriaRole.Button, new() { Name = "Reject all" }).ClickAsync();
        }

        var searchInboxLocator = page.Locator("#searchboxinput");
        await Assertions.Expect(searchInboxLocator).ToBeVisibleAsync(new() { Timeout = 10000 });

        var pdf = await page.PdfAsync(new()
        {
            PrintBackground = true
        });

        return TypedResults.File(pdf, MediaTypeNames.Application.Pdf, name + ".pdf");
    }

    //public static async Task<IResult> Execute(string name, IBrowserWrapper browserWrapper)
    //{
    //    var cities = name.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
    //    if (cities.Length == 0) return Results.BadRequest("No cities provided.");
    //
    //    var pdfs = await Task.WhenAll(cities.Select(city => CreatePdf(city, browserWrapper)));
    //
    //    using var ms = new MemoryStream();
    //    using var archive = new ZipArchive(ms, ZipArchiveMode.Create, true);
    //
    //    for (int i = 0; i < cities.Length; i++)
    //    {
    //        var entry = archive.CreateEntry($"{cities[i]}.pdf");
    //        using var stream = entry.Open();
    //        await stream.WriteAsync(pdfs[i]);
    //    }
    //
    //    ms.Seek(0, SeekOrigin.Begin);
    //    return TypedResults.File(ms.ToArray(), "application/zip", "city-maps.zip");
    //}

    private static async Task<byte[]> CreatePdf(string cityName, IBrowserWrapper browserWrapper)
    {
        var cityEncoded = cityName.Replace(" ", "%2B");
        var page = await browserWrapper.GetPage();
        await page.GotoAsync("https://consent.google.com/m?continue=https://www.google.com/maps/place/" + cityEncoded + "&gl=DE&m=0&pc=m&uxe=eomtm&cm=2&hl=en&src=1");

        if (!page.Url.StartsWith("https://www.google.com/maps/place"))
        {
            await page.GetByRole(AriaRole.Button, new() { Name = "Reject all" }).ClickAsync();
        }

        var searchInboxLocator = page.Locator("#searchboxinput");
        await Assertions.Expect(searchInboxLocator).ToBeVisibleAsync(new() { Timeout = 10000 });

        var pdf = await page.PdfAsync(new()
        {
            PrintBackground = true
        });

        return pdf;
    }
}
