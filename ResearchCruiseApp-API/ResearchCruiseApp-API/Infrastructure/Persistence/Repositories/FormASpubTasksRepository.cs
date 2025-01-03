﻿using ResearchCruiseApp_API.Application.ExternalServices.Persistence.Repositories;
using ResearchCruiseApp_API.Domain.Entities;

namespace ResearchCruiseApp_API.Infrastructure.Persistence.Repositories;


internal class FormASpubTasksRepository : Repository<FormASpubTask>, IFormASpubTasksRepository
{
    public FormASpubTasksRepository(ApplicationDbContext dbContext) : base(dbContext)
    { }
}