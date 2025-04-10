using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Services;
using backend.Models; // assuming ApplicationUser is in Models


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAuthorization();

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequiredLength = 20;
    options.Password.RequireDigit = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
});

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.Name = ".AspNetCore.Identity.Application";
    options.LoginPath = "/login";
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    //Tell ASP.NET this is a non-essential cookie
    options.Cookie.IsEssential = false;

});

builder.Services.Configure<CookiePolicyOptions>(options =>
{
    // Enforce consent check for all non-essential cookies
    options.CheckConsentNeeded = context => true;
    options.MinimumSameSitePolicy = SameSiteMode.None;
});




builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins(
                "http://localhost:3000",
                "https://gentle-ocean-085838b1e.6.azurestaticapps.net"
            )
            .AllowCredentials()
            .AllowAnyMethod()
            .AllowAnyHeader();
        });
});

// ✅ Update email sender to use ApplicationUser
builder.Services.AddSingleton<IEmailSender<ApplicationUser>, NoOpEmailSender<ApplicationUser>>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("AllowFrontend");
app.UseHttpsRedirection();


app.UseCookiePolicy(); // 👈 Must be BEFORE Authentication & Authorization
app.UseAuthentication();
app.UseAuthorization();



app.MapControllers();



// ✅ Use ApplicationUser for Identity API
app.MapIdentityApi<ApplicationUser>()
    .RequireCors("AllowFrontend");


app.MapGet("/trigger-consent", () => Results.Ok("Consent triggered."));

app.MapPost("/logout", async (HttpContext context, SignInManager<ApplicationUser> signInManager) =>
{
    await signInManager.SignOutAsync();

    context.Response.Cookies.Delete(".AspNetCore.Identity.Application", new CookieOptions
    {
        Path = "/",
        HttpOnly = true,
        Secure = true,
        SameSite = SameSiteMode.None
    });

    return Results.Ok(new { message = "Logout successful" });
}).RequireAuthorization();

app.MapGet("/pingauth", async (ClaimsPrincipal user, UserManager<ApplicationUser> userManager) =>
{
    if (!user.Identity?.IsAuthenticated ?? false)
    {
        return Results.Unauthorized();
    }

    var identityUser = await userManager.GetUserAsync(user);
    if (identityUser == null)
    {
        return Results.Unauthorized();
    }

    var roles = await userManager.GetRolesAsync(identityUser);
    var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com";

    return Results.Json(new
    {
        email = email,
        roles = roles
    });
}).RequireAuthorization();

app.Run();
