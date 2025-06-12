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

    // Make own repo
    // Implement a feature to allow users to download PDF maps for multiple cities in a single ZIP archive.
    // public static async Task<FileContentHttpResult> ExecuteMultiple(string name, IBrowserWrapper browserWrapper)
    // {
    //     var multipleCities = name.Split(",");
    // 
    //     List<byte[]> pdfList = new List<byte[]>();
    //     foreach (var city in multipleCities)
    //     {
    //         var aPdf = await CreatePdf(city, browserWrapper);
    //         pdfList.Add(aPdf);
    //     }
    // 
    //      using var memoryStream = new MemoryStream();
    //         using (var archive = new ZipArchive(memoryStream, ZipArchiveMode.Create, leaveOpen: true))
    //         {
    //             foreach (var city in multipleCities)
    //             {
    //                 var pdf = await CreatePdf(city, browserWrapper);
    //                 var entry = archive.CreateEntry($"{city}.pdf");
    // 
    //                 using var entryStream = entry.Open();
    //                 await entryStream.WriteAsync(pdf, 0, pdf.Length);
    //             }
    //         }
    // 
    //         memoryStream.Seek(0, SeekOrigin.Begin);
    //        return TypedResults.File(memoryStream.ToArray(), MediaTypeNames.Application.Zip, "city-maps.zip");
    // }

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
