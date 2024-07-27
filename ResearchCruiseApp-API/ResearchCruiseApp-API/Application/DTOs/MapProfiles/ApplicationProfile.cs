using AutoMapper;
using Microsoft.AspNetCore.Identity;
using ResearchCruiseApp_API.Domain.Entities;
using ResearchCruiseApp_API.Infrastructure.Persistence.DbContexts;
using ResearchCruiseApp_API.Infrastructure.Tools.Extensions;

namespace ResearchCruiseApp_API.Application.DTOs.MapProfiles;


public class ApplicationProfile : Profile
{
    public ApplicationProfile()
    {
        CreateMap<Domain.Entities.CruiseApplication, ApplicationModel>()
            .ForMember(
                dest => dest.Year,
                options =>
                    options.MapFrom(src =>
                        src.FormA != null ? src.FormA.Year : 0))
            .ForMember(dest => dest.CruiseManagerId,
                options =>
                    options.MapFrom(src =>
                        src.FormA != null ? src.FormA.CruiseManagerId : Guid.Empty))
            .ForMember(
                dest => dest.CruiseManagerEmail,
                options =>
                    options.MapFrom<CruiseManagerEmailResolver>())
            .ForMember(
                dest => dest.CruiseManagerFirstName,
                options =>
                    options.MapFrom<CruiseManagerFirstNameResolver>())
            .ForMember(
                dest => dest.CruiseManagerLastName,
                options =>
                    options.MapFrom<CruiseManagerLastNameResolver>())
            .ForMember(dest => dest.DeputyManagerId,
                options =>
                    options.MapFrom(src =>
                        src.FormA != null ? src.FormA.DeputyManagerId : Guid.Empty))
            .ForMember(
                dest => dest.DeputyManagerEmail,
                options =>
                    options.MapFrom<DeputyManagerEmailResolver>())
            .ForMember(
                dest => dest.DeputyManagerFirstName,
                options =>
                    options.MapFrom<DeputyManagerFirstNameResolver>())
            .ForMember(
                dest => dest.DeputyManagerLastName,
                options =>
                    options.MapFrom<DeputyManagerLastNameResolver>())
            .ForMember(
                dest => dest.HasFormA,
                options =>
                    options.MapFrom(src =>
                        src.FormA != null))
            .ForMember(
                dest => dest.HasFormB,
                options =>
                    options.MapFrom(src =>
                        src.FormB != null))
            .ForMember(
                dest => dest.HasFormC,
                options =>
                    options.MapFrom(src =>
                        src.FormC != null))
            .ForMember(
                dest => dest.Status,
                options =>
                    options.MapFrom(src => 
                        src.Status.GetStringValue()
                    ));

        CreateMap<Domain.Entities.CruiseApplication, ApplicationShortInfoModel>();
    }


    private class CruiseManagerEmailResolver(
        ResearchCruiseContext researchCruiseContext, UserManager<User> userManager)
        : IValueResolver<Domain.Entities.CruiseApplication, ApplicationModel, string?>
    {
        public string? Resolve(
            Domain.Entities.CruiseApplication src, ApplicationModel dest, string? cruiseManagerEmail, ResolutionContext context)
        {
            if (src.FormA == null)
                return string.Empty;

            var cruiseManager = userManager.FindByIdAsync(src.FormA.CruiseManagerId.ToString()).Result;
            return cruiseManager == null ? string.Empty : cruiseManager.Email;
        }
    }
    
    private class CruiseManagerFirstNameResolver(
        ResearchCruiseContext researchCruiseContext, UserManager<User> userManager)
        : IValueResolver<Domain.Entities.CruiseApplication, ApplicationModel, string>
    {
        public string Resolve(
            Domain.Entities.CruiseApplication src, ApplicationModel dest, string cruiseManagerFirstName, ResolutionContext context)
        {
            if (src.FormA == null)
                return "";

            var cruiseManager = userManager.FindByIdAsync(src.FormA.CruiseManagerId.ToString()).Result;
            return cruiseManager == null ? "" : cruiseManager.FirstName;
        }
    }
    
    private class CruiseManagerLastNameResolver(
        ResearchCruiseContext researchCruiseContext, UserManager<User> userManager)
        : IValueResolver<Domain.Entities.CruiseApplication, ApplicationModel, string>
    {
        public string Resolve(
            Domain.Entities.CruiseApplication src, ApplicationModel dest, string cruiseManagerFirstName, ResolutionContext context)
        {
            if (src.FormA == null)
                return "";

            var cruiseManager = userManager.FindByIdAsync(src.FormA.CruiseManagerId.ToString()).Result;
            return cruiseManager == null ? "" : cruiseManager.LastName;
        }
    }
    
    private class DeputyManagerEmailResolver(
        ResearchCruiseContext researchCruiseContext, UserManager<User> userManager)
        : IValueResolver<Domain.Entities.CruiseApplication, ApplicationModel, string?>
    {
        public string? Resolve(
            Domain.Entities.CruiseApplication src, ApplicationModel dest, string? deputyManagerEmail, ResolutionContext context)
        {
            if (src.FormA == null)
                return string.Empty;

            var deputyManager = userManager.FindByIdAsync(src.FormA.DeputyManagerId.ToString()).Result;
            return deputyManager == null ? string.Empty : deputyManager.Email;
        }
    }
    
    private class DeputyManagerFirstNameResolver(
        ResearchCruiseContext researchCruiseContext, UserManager<User> userManager)
        : IValueResolver<Domain.Entities.CruiseApplication, ApplicationModel, string>
    {
        public string Resolve(
            Domain.Entities.CruiseApplication src, ApplicationModel dest, string cruiseManagerFirstName, ResolutionContext context)
        {
            if (src.FormA == null)
                return "";

            var deputyManager = userManager.FindByIdAsync(src.FormA.DeputyManagerId.ToString()).Result;
            return deputyManager == null ? "" : deputyManager.FirstName;
        }
    }
    
    private class DeputyManagerLastNameResolver(
        ResearchCruiseContext researchCruiseContext, UserManager<User> userManager)
        : IValueResolver<Domain.Entities.CruiseApplication, ApplicationModel, string>
    {
        public string Resolve(
            Domain.Entities.CruiseApplication src, ApplicationModel dest, string cruiseManagerFirstName, ResolutionContext context)
        {
            if (src.FormA == null)
                return "";

            var deputyManager = userManager.FindByIdAsync(src.FormA.DeputyManagerId.ToString()).Result;
            return deputyManager == null ? "" : deputyManager.LastName;
        }
    }
}