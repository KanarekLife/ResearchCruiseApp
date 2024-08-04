using System.Text;
using Microsoft.AspNetCore.Identity;
using ResearchCruiseApp_API.Application.Common.Models;
using ResearchCruiseApp_API.Application.Common.Models.ServiceResult;

namespace ResearchCruiseApp_API.Infrastructure.Services.Identity;


public static class IdentityResultExtensions
{
    public static Result ToApplicationResult(this IdentityResult identityResult)
    {
        if (identityResult.Succeeded)
            return Result.Empty;

        var errorMessage = string.Join(" ",
            identityResult.Errors
                .Select(e => e.Description)
                .ToList());

        return Error.BadRequest(errorMessage);
    }
}