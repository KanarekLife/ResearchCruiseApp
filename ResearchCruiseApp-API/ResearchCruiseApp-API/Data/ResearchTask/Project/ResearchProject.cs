using System.Runtime.InteropServices.JavaScript;

namespace ResearchCruiseApp_API.Data.ResearchTask.Project;

public class ResearchProject(int type, string title, JSType.Date startDate, JSType.Date endDate, int financingAmount)
    :ProjectRealization(type, title, startDate, endDate, financingAmount) {}