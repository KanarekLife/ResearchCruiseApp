﻿using AutoMapper;
using ResearchCruiseApp_API.Application.ExternalServices;
using ResearchCruiseApp_API.Application.Models.DTOs.Cruises;
using ResearchCruiseApp_API.Domain.Entities;

namespace ResearchCruiseApp_API.Application.Services.Factories.CruiseDtos;


internal class CruiseDtosFactory(IMapper mapper, IIdentityService identityService) : ICruiseDtosFactory
{
    public async Task<CruiseDto> Create(Cruise cruise)
    {
        var cruiseDto = mapper.Map<CruiseDto>(cruise);
        var mainCruiseManager = await identityService.GetUserDtoById(cruise.MainCruiseManagerId);

        cruiseDto.MainCruiseManagerFirstName = mainCruiseManager?.FirstName ?? string.Empty;
        cruiseDto.MainCruiseManagerLastName = mainCruiseManager?.LastName ?? string.Empty;

        return cruiseDto;
    }
}