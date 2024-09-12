﻿using MediatR;
using ResearchCruiseApp_API.Application.Common.Models.ServiceResult;
using ResearchCruiseApp_API.Application.ExternalServices.Persistence;
using ResearchCruiseApp_API.Application.ExternalServices.Persistence.Repositories;
using ResearchCruiseApp_API.Application.Models.DTOs.CruiseApplications;

namespace ResearchCruiseApp_API.Application.UseCases.CruiseApplications.EditCruiseApplicationEvaluation;


public class EditCruiseApplicationEvaluationHandler(
    ICruiseApplicationsRepository cruiseApplicationsRepository,
    IFormAResearchTasksRepository formAResearchTasksRepository,
    IFormAContractsRepository formAContractsRepository,
    IFormAPublicationsRepository formAPublicationsRepository,
    IFormASpubTasksRepository formASpubTasksRepository,
    IUnitOfWork unitOfWork)
    : IRequestHandler<EditCruiseApplicationEvaluationCommand, Result>
{
    public async Task<Result> Handle(
        EditCruiseApplicationEvaluationCommand request, CancellationToken cancellationToken)
    {
        var cruiseApplicationEvaluationEditsDto = request.CruiseApplicationEvaluationsEditsDto;

        await EditResearchTasksEvaluations(cruiseApplicationEvaluationEditsDto, cancellationToken);
        await EditContractsEvaluations(cruiseApplicationEvaluationEditsDto, cancellationToken);
        await EditUgUnitsEvaluations(request, cancellationToken);
        await EditPublicationsEvaluations(cruiseApplicationEvaluationEditsDto, cancellationToken);
        await EditSpubTasksEvaluations(cruiseApplicationEvaluationEditsDto, cancellationToken);

        await unitOfWork.Complete(cancellationToken);
        
        return Result.Empty;
    }


    private async Task EditResearchTasksEvaluations(
        CruiseApplicationEvaluationsEditsDto cruiseApplicationEvaluationEditsDto, CancellationToken cancellationToken)
    {
        foreach (var researchTaskEvaluationEdit in cruiseApplicationEvaluationEditsDto.ResearchTasksEvaluationsEdits)
        {
            var formAResearchTask = await formAResearchTasksRepository
                .GetById(researchTaskEvaluationEdit.EvaluationId, cancellationToken);
            if (formAResearchTask is null)
                continue;

            formAResearchTask.Points = researchTaskEvaluationEdit.NewPoints;
        }
    }
    
    private async Task EditContractsEvaluations(
        CruiseApplicationEvaluationsEditsDto cruiseApplicationEvaluationEditsDto, CancellationToken cancellationToken)
    {
        foreach (var contractEvaluationEdit in cruiseApplicationEvaluationEditsDto.ContractsEvaluationsEdits)
        {
            var formAContract = await formAContractsRepository
                .GetById(contractEvaluationEdit.EvaluationId, cancellationToken);
            if (formAContract is null)
                continue;

            formAContract.Points = contractEvaluationEdit.NewPoints;
        }
    }
    
    private async Task EditUgUnitsEvaluations(
        EditCruiseApplicationEvaluationCommand request, CancellationToken cancellationToken)
    {
        var cruiseApplication = await cruiseApplicationsRepository
            .GetByIdWithFormA(request.Id, cancellationToken);
        if (cruiseApplication?.FormA is not null)
            cruiseApplication.FormA.UgUnitsPoints = request.CruiseApplicationEvaluationsEditsDto.NewUgUnitsPoints;
    }
    
    private async Task EditPublicationsEvaluations(
        CruiseApplicationEvaluationsEditsDto cruiseApplicationEvaluationEditsDto, CancellationToken cancellationToken)
    {
        foreach (var publicationEvaluationEdit in cruiseApplicationEvaluationEditsDto.PublicationsEvaluationsEdits)
        {
            var formAPublication = await formAPublicationsRepository
                .GetById(publicationEvaluationEdit.EvaluationId, cancellationToken);
            if (formAPublication is null)
                continue;

            formAPublication.Points = publicationEvaluationEdit.NewPoints;
        }
    }
    
    private async Task EditSpubTasksEvaluations(
        CruiseApplicationEvaluationsEditsDto cruiseApplicationEvaluationEditsDto, CancellationToken cancellationToken)
    {
        foreach (var spubTaskEvaluationEdit in cruiseApplicationEvaluationEditsDto.SpubTaskEvaluationsEdits)
        {
            var formASpubTask = await formASpubTasksRepository
                .GetById(spubTaskEvaluationEdit.EvaluationId, cancellationToken);
            if (formASpubTask is null)
                continue;

            formASpubTask.Points = spubTaskEvaluationEdit.NewPoints;
        }
    }
}