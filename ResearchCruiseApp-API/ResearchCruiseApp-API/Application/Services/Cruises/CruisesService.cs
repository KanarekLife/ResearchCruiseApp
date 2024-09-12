using ResearchCruiseApp_API.Application.ExternalServices;
using ResearchCruiseApp_API.Application.ExternalServices.Persistence;
using ResearchCruiseApp_API.Application.ExternalServices.Persistence.Repositories;
using ResearchCruiseApp_API.Domain.Entities;
using ResearchCruiseApp_API.Infrastructure.Persistence;

namespace ResearchCruiseApp_API.Application.Services.Cruises;


internal class CruisesService(
    IYearBasedKeyGenerator yearBasedKeyGenerator,
    ICruisesRepository cruisesRepository,
    IUnitOfWork unitOfWork,
    ApplicationDbContext applicationDbContext)
    : ICruisesService
{
    public Task PersistCruiseWithNewNumber(Cruise cruise, CancellationToken cancellationToken)
    {
        return unitOfWork.ExecuteIsolated(async () =>
            {
                cruise.Number = await yearBasedKeyGenerator.GenerateKey(cruisesRepository, cancellationToken);

                await cruisesRepository.Add(cruise, cancellationToken);
                await unitOfWork.Complete(cancellationToken);
            },
            System.Data.IsolationLevel.Serializable,
            cancellationToken
        );
    }
    
    public async Task CheckEditedCruisesManagersTeams(List<Cruise> editedCruises, CancellationToken cancellationToken)
    {
        foreach (var cruise in editedCruises)
        {
            foreach (var application in cruise.CruiseApplications)
            {
                await applicationDbContext.Entry(application)
                    .Reference(applicationEntry => applicationEntry.FormA)
                    .LoadAsync(cancellationToken);
            }

            if (cruise.CruiseApplications.Any(app => app.FormA == null))
                continue;

            var managersAvailableIds = cruise.CruiseApplications
                .Select(app => app.FormA!.CruiseManagerId)
                .Union(cruise.CruiseApplications
                    .Select(app => app.FormA!.DeputyManagerId))
                .ToList();

            if (cruise.MainCruiseManagerId != Guid.Empty && !managersAvailableIds.Contains(cruise.MainCruiseManagerId))
                cruise.MainCruiseManagerId = Guid.Empty;
            if (cruise.MainDeputyManagerId != Guid.Empty && !managersAvailableIds.Contains(cruise.MainDeputyManagerId))
                cruise.MainDeputyManagerId = Guid.Empty;
        }
    }
}