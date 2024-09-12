using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ResearchCruiseApp_API.Application.Models.DTOs.CruiseApplications;
using ResearchCruiseApp_API.Application.UseCases.CruiseApplications.AddCruiseApplication;
using ResearchCruiseApp_API.Application.UseCases.CruiseApplications.AnswerAsSupervisor;
using ResearchCruiseApp_API.Application.UseCases.CruiseApplications.GetAllCruiseApplications;
using ResearchCruiseApp_API.Application.UseCases.CruiseApplications.GetCruiseApplicationById;
using ResearchCruiseApp_API.Application.UseCases.CruiseApplications.GetFormA;
using ResearchCruiseApp_API.Application.UseCases.CruiseApplications.GetFormAForSupervisor;
using ResearchCruiseApp_API.Domain.Common.Constants;
using ResearchCruiseApp_API.Web.Common.Extensions;

namespace ResearchCruiseApp_API.Web.Controllers;


[Route("api/[controller]")]
[ApiController]
public class CruiseApplicationsController(IMediator mediator) : ControllerBase
{
    [Authorize(Roles = $"{RoleName.Administrator}, {RoleName.Shipowner}")]
    [HttpGet]
    public async Task<IActionResult> GetAllCruiseApplications()
    {
        var result = await mediator.Send(new GetAllCruiseApplicationsQuery());
        return result.IsSuccess
            ? Ok(result.Data)
            : this.CreateError(result);
    }
        
    [Authorize(Roles = $"{RoleName.Administrator}, {RoleName.Shipowner}")]
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetCruiseApplicationById(Guid id)
    {
        var result = await mediator.Send(new GetCruiseApplicationByIdQuery(id));
        return result.IsSuccess
            ? Ok(result.Data)
            : this.CreateError(result);
    }

    [Authorize(Roles = $"{RoleName.Administrator}, {RoleName.Shipowner}")]
    [HttpPost]
    public async Task<IActionResult> AddCruiseApplication(FormADto formADto)
    {

        if (!ModelState.IsValid)
        {
            // Pobranie informacji o błędach walidacji
            var errors = ModelState
                .Where(ms => ms.Value.Errors.Count > 0)
                .Select(ms => new 
                {
                    Field = ms.Key, // Nazwa pola, które nie przeszło walidacji
                    Errors = ms.Value.Errors.Select(e => e.ErrorMessage) // Lista komunikatów o błędach
                })
                .ToList();

            // Zwrócenie błędów jako odpowiedź
            return BadRequest(new { Errors = errors });
        }

        var result = await mediator.Send(new AddCruiseApplicationCommand(formADto));
        return result.IsSuccess
            ? Created()
            : this.CreateError(result);
    }
    
    [Authorize(Roles = $"{RoleName.Administrator}, {RoleName.Shipowner}, {RoleName.CruiseManager}")]
    [HttpGet("{cruiseApplicationId:guid}/formA")]
    public async Task<IActionResult> GetFormA(Guid cruiseApplicationId)
    {
        var result = await mediator.Send(new GetFormAQuery(cruiseApplicationId));
        return result.IsSuccess
            ? Ok(result.Data)
            : this.CreateError(result);
    }
    
    [AllowAnonymous]
    [HttpGet("{cruiseApplicationId:guid}/formAForAcceptance")]
    public async Task<IActionResult> GetFormAForSupervisor(Guid cruiseApplicationId, [FromQuery] string supervisorCode)
    {
        var result = await mediator.Send(new GetFormAForSupervisorQuery(cruiseApplicationId, supervisorCode));
        return result.IsSuccess
            ? Ok(result.Data)
            : this.CreateError(result);
    }
    
    [AllowAnonymous]
    [HttpPatch("{cruiseApplicationId:guid}/supervisorAnswer")]
    public async Task<IActionResult> AnswerAsSupervisor(
        Guid cruiseApplicationId, [FromQuery] bool accept, [FromQuery] string supervisorCode)
    {
        var result = await mediator
            .Send(new AnswerAsSupervisorCommand(cruiseApplicationId, accept, supervisorCode));
        return result.IsSuccess
            ? NoContent()
            : this.CreateError(result);
    }
}