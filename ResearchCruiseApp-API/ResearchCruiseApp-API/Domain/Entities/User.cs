﻿using Microsoft.AspNetCore.Identity;

namespace ResearchCruiseApp_API.Domain.Entities;


public class User : IdentityUser
{
    [ProtectedPersonalData]
    public string FirstName { get; set; } = null!;

    [ProtectedPersonalData]
    public string LastName { get; set; } = null!;

    public bool Accepted { get; set; }
}