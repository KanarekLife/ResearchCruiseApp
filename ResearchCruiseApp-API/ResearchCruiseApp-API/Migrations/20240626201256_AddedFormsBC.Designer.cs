﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ResearchCruiseApp_API.Data;

#nullable disable

namespace ResearchCruiseApp_API.Migrations
{
    [DbContext(typeof(ResearchCruiseContext))]
    [Migration("20240626201256_AddedFormsBC")]
    partial class AddedFormsBC
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ResearchCruiseApp_API.Data.Application", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CruiseId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateOnly>("Date")
                        .HasColumnType("date");

                    b.Property<Guid?>("FormAId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("FormBId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("FormCId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Number")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Points")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CruiseId");

                    b.HasIndex("FormAId");

                    b.HasIndex("FormBId");

                    b.HasIndex("FormCId");

                    b.ToTable("Applications");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.Contract", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<Guid?>("FormAId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("FormBId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("FormCId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("InstitutionLocation")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("InstitutionName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("InstitutionUnit")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.HasIndex("FormAId");

                    b.HasIndex("FormBId");

                    b.HasIndex("FormCId");

                    b.ToTable("Contract");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.Cruise", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("MainCruiseManagerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("MainDeputyManagerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Number")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Cruises");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.FormA", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("AcceptablePeriodBeg")
                        .HasColumnType("int");

                    b.Property<int>("AcceptablePeriodEnd")
                        .HasColumnType("int");

                    b.Property<int>("CruiseGoal")
                        .HasColumnType("int");

                    b.Property<string>("CruiseGoalDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CruiseHours")
                        .HasColumnType("int");

                    b.Property<Guid>("CruiseManagerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("DeputyManagerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("OptimalPeriodBeg")
                        .HasColumnType("int");

                    b.Property<int>("OptimalPeriodEnd")
                        .HasColumnType("int");

                    b.Property<string>("PeriodNotes")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Permissions")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PermissionsRequired")
                        .HasColumnType("bit");

                    b.Property<int>("ResearchArea")
                        .HasColumnType("int");

                    b.Property<int>("ShipUsage")
                        .HasColumnType("int");

                    b.Property<int>("Year")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("FormsA");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.FormB", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("AcceptablePeriodBeg")
                        .HasColumnType("int");

                    b.Property<int>("AcceptablePeriodEnd")
                        .HasColumnType("int");

                    b.Property<int>("CruiseGoal")
                        .HasColumnType("int");

                    b.Property<string>("CruiseGoalDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CruiseHours")
                        .HasColumnType("int");

                    b.Property<Guid>("CruiseManagerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("DeputyManagerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("OptimalPeriodBeg")
                        .HasColumnType("int");

                    b.Property<int>("OptimalPeriodEnd")
                        .HasColumnType("int");

                    b.Property<string>("PeriodNotes")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Permissions")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PermissionsRequired")
                        .HasColumnType("bit");

                    b.Property<string>("ResearchArea")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ShipUsage")
                        .HasColumnType("int");

                    b.Property<int>("Year")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("FormsB");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.FormC", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("AcceptablePeriodBeg")
                        .HasColumnType("int");

                    b.Property<int>("AcceptablePeriodEnd")
                        .HasColumnType("int");

                    b.Property<int>("CruiseGoal")
                        .HasColumnType("int");

                    b.Property<string>("CruiseGoalDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CruiseHours")
                        .HasColumnType("int");

                    b.Property<Guid>("CruiseManagerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("DeputyManagerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("OptimalPeriodBeg")
                        .HasColumnType("int");

                    b.Property<int>("OptimalPeriodEnd")
                        .HasColumnType("int");

                    b.Property<string>("PeriodNotes")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Permissions")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PermissionsRequired")
                        .HasColumnType("bit");

                    b.Property<string>("ResearchArea")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ShipUsage")
                        .HasColumnType("int");

                    b.Property<int>("Year")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("FormsC");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.GuestTeam", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Count")
                        .HasColumnType("int");

                    b.Property<Guid?>("FormAId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("FormBId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("FormCId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Institution")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("FormAId");

                    b.HasIndex("FormBId");

                    b.HasIndex("FormCId");

                    b.ToTable("GuestTeams");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.Publication", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Authors")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("DOI")
                        .HasColumnType("int");

                    b.Property<Guid?>("FormAId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("FormBId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("FormCId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Magazine")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Points")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Year")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FormAId");

                    b.HasIndex("FormBId");

                    b.HasIndex("FormCId");

                    b.ToTable("Publication");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.ResearchTask", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Author")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Date")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EndDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FinancingAmount")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("FormAId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("FormBId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("FormCId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Institution")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StartDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FormAId");

                    b.HasIndex("FormBId");

                    b.HasIndex("FormCId");

                    b.ToTable("ResearchTask");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.SPUBTask", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("FormAId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("FormBId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("FormCId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("YearFrom")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("YearTo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("FormAId");

                    b.HasIndex("FormBId");

                    b.HasIndex("FormCId");

                    b.ToTable("SPUBTasks");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.UGTeam", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("FormAId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("FormBId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("FormCId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("NoOfEmployees")
                        .HasColumnType("int");

                    b.Property<int>("NoOfStudents")
                        .HasColumnType("int");

                    b.Property<int>("Value")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FormAId");

                    b.HasIndex("FormBId");

                    b.HasIndex("FormCId");

                    b.ToTable("UGTeam");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.Work", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Author")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("FormAId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("FormBId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("FormCId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Promoter")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Year")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FormAId");

                    b.HasIndex("FormBId");

                    b.HasIndex("FormCId");

                    b.ToTable("Work");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.Application", b =>
                {
                    b.HasOne("ResearchCruiseApp_API.Data.Cruise", null)
                        .WithMany("Applications")
                        .HasForeignKey("CruiseId");

                    b.HasOne("ResearchCruiseApp_API.Data.FormA", "FormA")
                        .WithMany()
                        .HasForeignKey("FormAId");

                    b.HasOne("ResearchCruiseApp_API.Data.FormB", "FormB")
                        .WithMany()
                        .HasForeignKey("FormBId");

                    b.HasOne("ResearchCruiseApp_API.Data.FormC", "FormC")
                        .WithMany()
                        .HasForeignKey("FormCId");

                    b.Navigation("FormA");

                    b.Navigation("FormB");

                    b.Navigation("FormC");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.Contract", b =>
                {
                    b.HasOne("ResearchCruiseApp_API.Data.FormA", null)
                        .WithMany("Contracts")
                        .HasForeignKey("FormAId");

                    b.HasOne("ResearchCruiseApp_API.Data.FormB", null)
                        .WithMany("Contracts")
                        .HasForeignKey("FormBId");

                    b.HasOne("ResearchCruiseApp_API.Data.FormC", null)
                        .WithMany("Contracts")
                        .HasForeignKey("FormCId");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.GuestTeam", b =>
                {
                    b.HasOne("ResearchCruiseApp_API.Data.FormA", null)
                        .WithMany("GuestTeams")
                        .HasForeignKey("FormAId");

                    b.HasOne("ResearchCruiseApp_API.Data.FormB", null)
                        .WithMany("GuestTeams")
                        .HasForeignKey("FormBId");

                    b.HasOne("ResearchCruiseApp_API.Data.FormC", null)
                        .WithMany("GuestTeams")
                        .HasForeignKey("FormCId");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.Publication", b =>
                {
                    b.HasOne("ResearchCruiseApp_API.Data.FormA", null)
                        .WithMany("Publications")
                        .HasForeignKey("FormAId");

                    b.HasOne("ResearchCruiseApp_API.Data.FormB", null)
                        .WithMany("Publications")
                        .HasForeignKey("FormBId");

                    b.HasOne("ResearchCruiseApp_API.Data.FormC", null)
                        .WithMany("Publications")
                        .HasForeignKey("FormCId");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.ResearchTask", b =>
                {
                    b.HasOne("ResearchCruiseApp_API.Data.FormA", null)
                        .WithMany("ResearchTasks")
                        .HasForeignKey("FormAId");

                    b.HasOne("ResearchCruiseApp_API.Data.FormB", null)
                        .WithMany("ResearchTasks")
                        .HasForeignKey("FormBId");

                    b.HasOne("ResearchCruiseApp_API.Data.FormC", null)
                        .WithMany("ResearchTasks")
                        .HasForeignKey("FormCId");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.SPUBTask", b =>
                {
                    b.HasOne("ResearchCruiseApp_API.Data.FormA", null)
                        .WithMany("SPUBTasks")
                        .HasForeignKey("FormAId");

                    b.HasOne("ResearchCruiseApp_API.Data.FormB", null)
                        .WithMany("SPUBTasks")
                        .HasForeignKey("FormBId");

                    b.HasOne("ResearchCruiseApp_API.Data.FormC", null)
                        .WithMany("SPUBTasks")
                        .HasForeignKey("FormCId");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.UGTeam", b =>
                {
                    b.HasOne("ResearchCruiseApp_API.Data.FormA", null)
                        .WithMany("UGTeams")
                        .HasForeignKey("FormAId");

                    b.HasOne("ResearchCruiseApp_API.Data.FormB", null)
                        .WithMany("UGTeams")
                        .HasForeignKey("FormBId");

                    b.HasOne("ResearchCruiseApp_API.Data.FormC", null)
                        .WithMany("UGTeams")
                        .HasForeignKey("FormCId");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.Work", b =>
                {
                    b.HasOne("ResearchCruiseApp_API.Data.FormA", null)
                        .WithMany("Works")
                        .HasForeignKey("FormAId");

                    b.HasOne("ResearchCruiseApp_API.Data.FormB", null)
                        .WithMany("Works")
                        .HasForeignKey("FormBId");

                    b.HasOne("ResearchCruiseApp_API.Data.FormC", null)
                        .WithMany("Works")
                        .HasForeignKey("FormCId");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.Cruise", b =>
                {
                    b.Navigation("Applications");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.FormA", b =>
                {
                    b.Navigation("Contracts");

                    b.Navigation("GuestTeams");

                    b.Navigation("Publications");

                    b.Navigation("ResearchTasks");

                    b.Navigation("SPUBTasks");

                    b.Navigation("UGTeams");

                    b.Navigation("Works");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.FormB", b =>
                {
                    b.Navigation("Contracts");

                    b.Navigation("GuestTeams");

                    b.Navigation("Publications");

                    b.Navigation("ResearchTasks");

                    b.Navigation("SPUBTasks");

                    b.Navigation("UGTeams");

                    b.Navigation("Works");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.FormC", b =>
                {
                    b.Navigation("Contracts");

                    b.Navigation("GuestTeams");

                    b.Navigation("Publications");

                    b.Navigation("ResearchTasks");

                    b.Navigation("SPUBTasks");

                    b.Navigation("UGTeams");

                    b.Navigation("Works");
                });
#pragma warning restore 612, 618
        }
    }
}