using FluentValidation;
using MediatR;
using ResearchCruiseApp.Application.Common.Extensions;
using ResearchCruiseApp.Application.ExternalServices.Persistence;
using ResearchCruiseApp.Application.ExternalServices.Persistence.Repositories;
using ResearchCruiseApp.Application.Models.Common.Commands.CruiseApplications;
using ResearchCruiseApp.Application.Models.Common.ServiceResult;
using ResearchCruiseApp.Application.Models.DTOs.CruiseApplications;
using ResearchCruiseApp.Application.Services.CruiseApplicationEvaluator;
using ResearchCruiseApp.Application.Services.CruiseApplications;
using ResearchCruiseApp.Application.Services.Factories.CruiseApplications;
using ResearchCruiseApp.Application.Services.Factories.FormsA;
using ResearchCruiseApp.Domain.Entities;

namespace ResearchCruiseApp.Application.UseCases.CruiseApplications.AddCruiseApplication;

public class AddCruiseApplicationHandler(
    IValidator<FormACommand> validator,
    IFormsAFactory formsAFactory,
    ICruiseApplicationsFactory cruiseApplicationsFactory,
    ICruiseApplicationsRepository cruiseApplicationsRepository,
    IUnitOfWork unitOfWork,
    ICruiseApplicationEvaluator cruiseApplicationEvaluator,
    ICruiseApplicationsService cruiseApplicationsService
) : IRequestHandler<AddCruiseApplicationCommand, Result>
{
    public async Task<Result> Handle(
        AddCruiseApplicationCommand request,
        CancellationToken cancellationToken
    )
    {
        var validationResult = await validator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
            return validationResult.ToApplicationResult();

        var newCruiseApplicationResult = await unitOfWork.ExecuteIsolated(
            action: () =>
                AddCruiseApplication(request.FormADto, request.IsDraft, cancellationToken),
            cancellationToken
        );
        if (!newCruiseApplicationResult.IsSuccess)
            return newCruiseApplicationResult;

        if (!request.IsDraft)
            await cruiseApplicationsService.SendRequestToSupervisor(
                newCruiseApplicationResult.Data!,
                request.FormADto.SupervisorEmail
            );

        return Result.Empty;
    }

    private async Task<Result<CruiseApplication>> AddCruiseApplication(
        FormADto formADto,
        bool isDraft,
        CancellationToken cancellationToken
    )
    {
        var newCruiseApplicationResult = await GetNewCruiseApplication(
            formADto,
            isDraft,
            cancellationToken
        );
        if (!newCruiseApplicationResult.IsSuccess)
            return newCruiseApplicationResult;
        var newCruiseApplication = newCruiseApplicationResult.Data!;

        await cruiseApplicationEvaluator.Evaluate(newCruiseApplication, isDraft, cancellationToken);

        await unitOfWork.Complete(cancellationToken);
        return newCruiseApplication;
    }

    private async Task<Result<CruiseApplication>> GetNewCruiseApplication(
        FormADto formADto,
        bool isDraft,
        CancellationToken cancellationToken
    )
    {
        var newFormAResult = await formsAFactory.Create(formADto, cancellationToken);
        if (!newFormAResult.IsSuccess)
            return newFormAResult.Error!;

        var newCruiseApplication = cruiseApplicationsFactory.Create(
            newFormAResult.Data!,
            formADto.Note,
            isDraft
        );
        await cruiseApplicationsRepository.Add(newCruiseApplication, cancellationToken);

        return newCruiseApplication;
    }
}
