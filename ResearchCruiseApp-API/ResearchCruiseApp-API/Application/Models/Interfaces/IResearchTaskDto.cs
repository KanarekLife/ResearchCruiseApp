﻿using AutoMapper;
using ResearchCruiseApp_API.Domain.Entities;

namespace ResearchCruiseApp_API.Application.Models.Interfaces;


public interface IResearchTaskDto
{
    string Type { get; init; }

    string? Title { get; init; }
        
    string? Author { get; init; }
        
    string? Institution { get; init; }
        
    string? Date { get; init; }
        
    string? StartDate { get; init; }
    
    string? EndDate { get; init; }
        
    string? FinancingAmount { get; init; }
    
    string? FinancingApproved { get; init; }
        
    string? Description { get; init; }

    string? SecuredAmount { get; init; }

    string? MinisterialPoints { get; init; }
    
    
    private class MapProfile : Profile
    {
        public MapProfile()
        {
            CreateMap<IResearchTaskDto, ResearchTask>();
        }
    }
}