namespace ResearchCruiseApp_API.Models;

public class EditCruiseModel
{
    public StringRange Date { get; set; }

    public CruiseManagersTeam ManagersTeam { get; set; }
    public List<Guid> ApplicationsIds { get; set; } = [];
}