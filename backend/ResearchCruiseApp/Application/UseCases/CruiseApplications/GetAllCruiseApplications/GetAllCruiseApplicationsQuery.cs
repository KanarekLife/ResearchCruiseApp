using MediatR;
using ResearchCruiseApp.Application.Models.Common.ServiceResult;
using ResearchCruiseApp.Application.Models.DTOs.CruiseApplications;

namespace ResearchCruiseApp.Application.UseCases.CruiseApplications.GetAllCruiseApplications;

public record GetAllCruiseApplicationsQuery : IRequest<Result<List<CruiseApplicationDto>>>;