﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices.JavaScript;
using NuGet.Protocol.Plugins;
using ResearchCruiseApp_API.Data.ResearchTask;
using ResearchCruiseApp_API.Models;

namespace ResearchCruiseApp_API.Data;


public class FormA
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    
    public Guid CruiseManagerId { get; set; }
    
    public Guid DeputyManagerId { get; set; }
    
    public int Year { get; set; }
  
    public int AcceptablePeriodBeg { get; set; }
    public int AcceptablePeriodEnd { get; set; }
    
    public int OptimalPeriodBeg { get; set; }
    public int OptimalPeriodEnd { get; set; }
    
    public int CruiseHours { get; set; }

    public string PeriodNotes { get; set; }
    
    public int ShipUsage { get; set; }
    
    private bool _permissionsRequired;
    public bool PermissionsRequired
    {
        get{return _permissionsRequired;}
        set
        {
            _permissionsRequired = value;
            if (!value)
            {
                Permissions = null;
            }
        }
    }
    
    public string? Permissions { get; set; }
    /* TODO Zdobyć wymagania co do obszaru */
    
    
    public int ResearchArea { get; set; } 
    
    public int CruiseGoalType { get; set; }
    public string CruiseGoalDescription { get; set; }
    
    // public List<IResearchTask> ResearchTasks { get; set; } 
    
    //public List<Contract> Contracts { get; set; } 
    
    // public string OrganizationalUnit { get; set; } ;

    // public List<SPUBTask> SPUBTasks { get; set; } ;
    public FormA()
    {
        // Domyślnie właściwości CruiseManager i Deputy będą miały wartość null
        // Nie musisz nic tutaj inicjalizować, jeśli chcesz, żeby były niezainicjowane.
    }

}