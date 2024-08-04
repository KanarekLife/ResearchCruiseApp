using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ResearchCruiseApp_API.Application.Models.DTOs.Users;
using ResearchCruiseApp_API.Application.UseCases.Users;
using ResearchCruiseApp_API.Application.UseCases.Users.AcceptUser;
using ResearchCruiseApp_API.Application.UseCases.Users.AddUser;
using ResearchCruiseApp_API.Application.UseCases.Users.GetAllUsers;
using ResearchCruiseApp_API.Application.UseCases.Users.GetUserById;
using ResearchCruiseApp_API.Application.UseCases.Users.ToggleUserRole;
using ResearchCruiseApp_API.Domain.Common.Constants;
using ResearchCruiseApp_API.Web.Common.Extensions;

namespace ResearchCruiseApp_API.Web.Controllers;


[Route("[controller]")]
[ApiController]
public class UsersController(IMediator mediator) : ControllerBase
{
    [Authorize(Roles = $"{RoleName.Administrator}, {RoleName.Shipowner}")]
    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        var result = await mediator.Send(new GetAllUsersQuery(User));
        return result.Error is null
            ? Ok(result.Data)
            : this.CreateError(result);
    }

    [Authorize(Roles = RoleName.Administrator)]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById([FromRoute] Guid id)
    {
        var result = await mediator.Send(new GetUserByIdQuery(id, User));
        return result.Error is null
            ? Ok(result.Data)
            : this.CreateError(result);
    }

    [Authorize(Roles = $"{RoleName.Administrator}, {RoleName.Shipowner}")]
    [HttpPost]
    public async Task<IActionResult> AddUser([FromBody] AddUserFormDto registerForm)
    {
        var result = await mediator.Send(new AddUserCommand(registerForm, User));
        return result.Error is null
            ? Created()
            : this.CreateError(result);
    }

    [Authorize(Roles = $"{RoleName.Administrator}, {RoleName.Shipowner}")]
    [HttpPatch("unaccepted/{id}")]
    public async Task<IActionResult> AcceptUser([FromRoute] Guid id)
    {
        var result = await mediator.Send(new AcceptUserCommand(id));
        return result.Error is null
            ? NoContent()
            : this.CreateError(result);
    }

    [Authorize(Roles = RoleName.Administrator)]
    [HttpPatch("{id}/roles")]
    public async Task<IActionResult> ToggleUserRole(
        [FromRoute] Guid id,
        [FromBody] UserRoleToggleDto userRoleToggle)
    {
        var result = await mediator.Send(new ToggleUserRoleCommand(id, userRoleToggle));
        return result.Error is null
            ? NoContent()
            : this.CreateError(result);
    }
}