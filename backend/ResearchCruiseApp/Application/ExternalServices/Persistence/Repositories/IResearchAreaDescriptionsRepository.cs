using ResearchCruiseApp.Domain.Entities;

namespace ResearchCruiseApp.Application.ExternalServices.Persistence.Repositories;

public interface IResearchAreaDescriptionsRepository : IRepository<ResearchAreaDescription>
{
    Task<int> CountDistinctFormsA(
        ResearchAreaDescription researchAreaDescription,
        CancellationToken cancellationToken
    );
    Task<int> CountDistinctFormsC(
        ResearchAreaDescription researchAreaDescription,
        CancellationToken cancellationToken
    );
}
