using ResearchCruiseApp_API.Application.ExternalServices;
using ResearchCruiseApp_API.Application.ExternalServices.Persistence.Repositories;
using ResearchCruiseApp_API.Domain.Common.Interfaces;
using ResearchCruiseApp_API.Domain.Entities;

namespace ResearchCruiseApp_API.Infrastructure.Services;


internal class YearBasedKeyGenerator : IYearBasedKeyGenerator
{
    public async Task<string> GenerateKey<T>(IRepository<T> repository, CancellationToken cancellationToken)
        where T : Entity, IYearBasedNumbered
    {
        var currentYear = DateTime.Now.Year.ToString();
        var ordinalNumberStartIdx = currentYear.Length + 1;
        var entities = await repository.GetAll(cancellationToken);
        var maxCurrentYearOrdinalNumber = entities
            .Where(e => e.Number.StartsWith(currentYear))
            .MaxBy(e => int.Parse(e.Number[ordinalNumberStartIdx..]))
            ?.Number[ordinalNumberStartIdx..] ?? "0";

        return $"{currentYear}/{int.Parse(maxCurrentYearOrdinalNumber) + 1}";
    }
}