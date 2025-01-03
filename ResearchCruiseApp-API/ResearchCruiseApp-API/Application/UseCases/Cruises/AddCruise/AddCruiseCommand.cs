using MediatR;
using ResearchCruiseApp_API.Application.Models.Common.ServiceResult;
using ResearchCruiseApp_API.Application.Models.DTOs.Cruises;

namespace ResearchCruiseApp_API.Application.UseCases.Cruises.AddCruise;


public record AddCruiseCommand(CruiseFormDto CruiseFormDto) : IRequest<Result>;