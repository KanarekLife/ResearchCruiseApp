﻿namespace ResearchCruiseApp_API.Application.Models.DTOs.CruiseApplications;


public class EvaluationEditDto
{
    public Guid EvaluationId { get; set; }

    public int NewPoints { get; set; }
}