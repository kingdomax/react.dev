using Interview.PdfCreation.Features.RenderCityMap;
using Interview.PdfCreation.Services;

Console.WriteLine("Installing Playwright Browsers...");
var exitCode = Microsoft.Playwright.Program.Main(new[] { "install", "chromium" });
if (exitCode != 0)
{
    throw new Exception($"Playwright exited with code {exitCode}");
}
Console.WriteLine("Playwright Browsers installed successfully.");

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:4200")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

// services
builder.Services.AddSingleton<IBrowserWrapper, BrowserWrapper>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.MapGet("/api/render/city", RenderCityMapEndpoint.Execute).WithOpenApi();

app.Run();

public partial class Program { }