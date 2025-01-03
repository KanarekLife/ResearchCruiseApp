﻿using ResearchCruiseApp.Application.ExternalServices.Persistence.Repositories;
using ResearchCruiseApp.Domain.Entities;

namespace ResearchCruiseApp.Infrastructure.Persistence.Repositories;

internal class FormCGuestUnitsRepository : Repository<FormCGuestUnit>, IFormCGuestUnitsRepository
{
    public FormCGuestUnitsRepository(ApplicationDbContext dbContext)
        : base(dbContext) { }
}