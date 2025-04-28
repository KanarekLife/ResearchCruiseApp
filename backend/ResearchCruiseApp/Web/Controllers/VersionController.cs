using System.Reflection;
using Microsoft.AspNetCore.Mvc;

namespace ResearchCruiseApp.Web.Controllers;

[Route("[controller]")]
[ApiController]
public class VersionController : ControllerBase
{
    private static string? _version = typeof(Program)
        .Assembly.GetCustomAttribute<AssemblyFileVersionAttribute>()
        ?.Version;

    [HttpGet]
    public IActionResult GetVersion()
    {
        return _version is not null ? Ok(_version) : NotFound();
    }
}
