﻿using FluentValidation.Results;
using ResearchCruiseApp_API.Application.Common.Models.ServiceResult;

namespace ResearchCruiseApp_API.Application.Common.Extensions;


public static class ValidationResultExtensions
{
    public static Result ToApplicationResult(this ValidationResult result)
    {
        if (result.IsValid)
            return Result.Empty;

        var errorMessage = string.Join(" ",
            result.Errors
                .Select(error => error.ErrorMessage)
                .ToList());

        return Error.BadRequest(errorMessage);
    }
}