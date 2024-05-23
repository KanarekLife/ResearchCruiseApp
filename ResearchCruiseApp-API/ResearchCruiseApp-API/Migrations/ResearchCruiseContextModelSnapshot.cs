﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ResearchCruiseApp_API.Data;

#nullable disable

namespace ResearchCruiseApp_API.Migrations
{
    [DbContext(typeof(ResearchCruiseContext))]
    partial class ResearchCruiseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
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

                    b.Property<string>("FormA")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FormB")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FormC")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Points")
                        .HasColumnType("int");

                    b.Property<int>("State")
                        .HasColumnType("int");

                    b.HasKey("Id");

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

                    b.Property<string>("Institution")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Unit")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.HasIndex("FormAId");

                    b.ToTable("Contract");
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

                    b.Property<string>("CruiseGoalDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CruiseGoalType")
                        .HasColumnType("int");

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

            modelBuilder.Entity("ResearchCruiseApp_API.Data.GuestTeam", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Count")
                        .HasColumnType("int");

                    b.Property<Guid?>("FormAId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Institution")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("FormAId");

                    b.ToTable("GuestTeam");
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

                    b.ToTable("ResearchTask");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.SPUBTask", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("FormAId")
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

                    b.ToTable("SPUBTask");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.UGTeam", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("FormAId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("NoOfEmployees")
                        .HasColumnType("int");

                    b.Property<int>("NoOfStudents")
                        .HasColumnType("int");

                    b.Property<int>("Value")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FormAId");

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

                    b.ToTable("Work");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.Contract", b =>
                {
                    b.HasOne("ResearchCruiseApp_API.Data.FormA", null)
                        .WithMany("Contracts")
                        .HasForeignKey("FormAId");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.GuestTeam", b =>
                {
                    b.HasOne("ResearchCruiseApp_API.Data.FormA", null)
                        .WithMany("GuestTeams")
                        .HasForeignKey("FormAId");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.Publication", b =>
                {
                    b.HasOne("ResearchCruiseApp_API.Data.FormA", null)
                        .WithMany("Publications")
                        .HasForeignKey("FormAId");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.ResearchTask", b =>
                {
                    b.HasOne("ResearchCruiseApp_API.Data.FormA", null)
                        .WithMany("ResearchTasks")
                        .HasForeignKey("FormAId");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.SPUBTask", b =>
                {
                    b.HasOne("ResearchCruiseApp_API.Data.FormA", null)
                        .WithMany("SPUBTasks")
                        .HasForeignKey("FormAId");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.UGTeam", b =>
                {
                    b.HasOne("ResearchCruiseApp_API.Data.FormA", null)
                        .WithMany("UGTeams")
                        .HasForeignKey("FormAId");
                });

            modelBuilder.Entity("ResearchCruiseApp_API.Data.Work", b =>
                {
                    b.HasOne("ResearchCruiseApp_API.Data.FormA", null)
                        .WithMany("Works")
                        .HasForeignKey("FormAId");
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
#pragma warning restore 612, 618
        }
    }
}
