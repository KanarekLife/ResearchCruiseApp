using ResearchCruiseApp.Application.Models.Interfaces;

namespace ResearchCruiseApp.Application.Models.DTOs.CruiseApplications;

public class ResearchTaskDto : IResearchTaskDto
{
    public string Type { get; init; } = null!;

    public string? Title { get; init; }

    public string? Magazine { get; init; }

    public string? Author { get; init; }

    public string? Institution { get; init; }

    public string? Date { get; init; }

    public string? StartDate { get; init; }

    public string? EndDate { get; init; }

    public string? FinancingAmount { get; init; }

    public string? FinancingApproved { get; init; }

    public string? Description { get; init; }

    public string? SecuredAmount { get; init; }

    public string? MinisterialPoints { get; init; }
}
