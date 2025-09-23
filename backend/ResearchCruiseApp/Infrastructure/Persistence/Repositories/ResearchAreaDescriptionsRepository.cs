using Microsoft.EntityFrameworkCore;
using ResearchCruiseApp.Application.ExternalServices.Persistence.Repositories;
using ResearchCruiseApp.Domain.Entities;

namespace ResearchCruiseApp.Infrastructure.Persistence.Repositories;

internal class ResearchAreaDescriptionsRepository
    : Repository<ResearchAreaDescription>,
        IResearchAreaDescriptionsRepository
{
    public ResearchAreaDescriptionsRepository(ApplicationDbContext dbContext)
        : base(dbContext) { }

    public async Task<int> CountDistinctFormsA(
        ResearchAreaDescription researchAreaDescription,
        CancellationToken cancellationToken
    )
    {
        return await DbContext
            .ResearchAreaDescriptions.Where(r => r.Id == researchAreaDescription.Id)
            .SelectMany(r => r.FormsA)
            .Select(fr => fr.Id)
            .Distinct()
            .CountAsync(cancellationToken);
    }

    public async Task<int> CountDistinctFormsC(
        ResearchAreaDescription researchAreaDescription,
        CancellationToken cancellationToken
    )
    {
        return await DbContext
            .ResearchAreaDescriptions.Where(r => r.Id == researchAreaDescription.Id)
            .SelectMany(r => r.FormsC)
            .Select(fr => fr.Id)
            .Distinct()
            .CountAsync(cancellationToken);
    }
}
