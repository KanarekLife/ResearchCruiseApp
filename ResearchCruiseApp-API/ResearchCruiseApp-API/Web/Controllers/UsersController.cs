using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ResearchCruiseApp_API.Application.UseCaseServices.Users;
using ResearchCruiseApp_API.Application.UseCaseServices.Users.DTOs;
using ResearchCruiseApp_API.Domain.Common.Constants;

namespace ResearchCruiseApp_API.Web.Controllers;


[Route("[controller]")]
[ApiController]
public class UsersController(IUsersService usersService) : ControllerBase
{
    [Authorize(Roles = $"{RoleName.Administrator}, {RoleName.Shipowner}")]
    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        var result = await usersService.GetAllUsers(User);
        return result.Error is null
            ? Ok(result.Data)
            : StatusCode(result.Error.StatusCode, result.Error.ErrorMessage);
    }

    [Authorize(Roles = RoleName.Administrator)]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById([FromRoute] Guid id)
    {
        var result = await usersService.GetUserById(id, User);
        return result.Error is null
            ? Ok(result.Data)
            : StatusCode(result.Error.StatusCode, result.Error.ErrorMessage);
    }

    [Authorize(Roles = $"{RoleName.Administrator}, {RoleName.Shipowner}")]
    [HttpPost]
    public async Task<IActionResult> AddUser([FromBody] AddUserFormDto registerForm)
    {
        var result = await usersService.AddUser(registerForm, User);
        return result.Error is null
            ? Created()
            : StatusCode(result.Error.StatusCode, result.Error.ErrorMessage);
    }

    [Authorize(Roles = $"{RoleName.Administrator}, {RoleName.Shipowner}")]
    [HttpGet("unaccepted")]
    public async Task<IActionResult> GetAllUnacceptedUsers()
    {
        var result = await usersService.GetAllUnacceptedUsers();
        return result.Error is null
            ? Ok(result.Data)
            : StatusCode(result.Error.StatusCode, result.Error.ErrorMessage);
    }

    [Authorize(Roles = $"{RoleName.Administrator}, {RoleName.Shipowner}")]
    [HttpPatch("unaccepted/{id}")]
    public async Task<IActionResult> AcceptUser([FromRoute] Guid id)
    {
        var result = await usersService.AcceptUser(id);
        return result.Error is null
            ? NoContent()
            : StatusCode(result.Error.StatusCode, result.Error.ErrorMessage);
    }

    [Authorize(Roles = RoleName.Administrator)]
    [HttpPatch("{id}/roles")]
    public async Task<IActionResult> ToggleUserRole(
        [FromRoute] Guid id,
        [FromBody] UserRoleToggleDto userRoleToggle)
    {
        var result = await usersService.ToggleUserRole(id, userRoleToggle);
        return result.Error is null
            ? NoContent()
            : StatusCode(result.Error.StatusCode, result.Error.ErrorMessage);
    }
}