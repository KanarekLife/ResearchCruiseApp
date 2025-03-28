﻿using MediatR;
using ResearchCruiseApp.Application.Models.Common.ServiceResult;
using ResearchCruiseApp.Application.Models.DTOs.Account;

namespace ResearchCruiseApp.Application.UseCases.Account.EnablePasswordReset;

public record EnablePasswordResetCommand(ForgotPasswordFormDto ForgotPasswordFormDto)
    : IRequest<Result>;
