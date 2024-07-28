using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ResearchCruiseApp_API.Application.UseCaseServices.Cruises;
using ResearchCruiseApp_API.Application.UseCaseServices.Cruises.DTOs;
using ResearchCruiseApp_API.Domain.Common.Constants;

namespace ResearchCruiseApp_API.Web.Controllers;


[Authorize(Roles = $"{RoleName.Administrator}, {RoleName.Shipowner}")]
[Route("api/[controller]")]
[ApiController]
public class CruisesController(ICruisesService cruisesService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAllCruises()
    {
        var result = await cruisesService.GetAllCruises();
        return result.Error is null
            ? Ok(result.Data)
            : StatusCode(result.Error.StatusCode, result.Error.ErrorMessage);
    }

    [HttpPost]
    public async Task<IActionResult> AddCruise([FromBody] CruiseFormDto cruiseFormModel)
    {
        var result = await cruisesService.AddCruise(cruiseFormModel);
        return result.Error is null
            ? Created()
            : StatusCode(result.Error.StatusCode, result.Error.ErrorMessage);
    }

    [HttpPatch("{id:guid}")]
    public async Task<IActionResult> EditCruise([FromRoute] Guid id, [FromBody] CruiseFormDto cruiseFormModel)
    {
        var result = await cruisesService.EditCruise(id, cruiseFormModel);
        return result.Error is null
            ? NoContent()
            : StatusCode(result.Error.StatusCode, result.Error.ErrorMessage);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteCruise([FromRoute] Guid id)
    {
        var result = await cruisesService.DeleteCruise(id);
        return result.Error is null
            ? NoContent()
            : StatusCode(result.Error.StatusCode, result.Error.ErrorMessage);
    }
        
    [HttpPut("autoAdded")]
    public async Task<IActionResult> AutoAddCruises()
    {
        var result = await cruisesService.AutoAddCruises();
        return result.Error is null
            ? NoContent()
            : StatusCode(result.Error.StatusCode, result.Error.ErrorMessage);
    }
}