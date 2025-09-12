using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ResearchCruiseApp.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddCustomizableCruises : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ShipUnavailable",
                table: "Cruises",
                type: "bit",
                nullable: false,
                defaultValue: false
            );

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Cruises",
                type: "nvarchar(512)",
                maxLength: 512,
                nullable: true
            );

            migrationBuilder.AlterColumn<string>(
                name: "FileName",
                table: "ContractFiles",
                type: "nvarchar(1024)",
                maxLength: 1024,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(1024)",
                oldMaxLength: 1024
            );

            migrationBuilder.AlterColumn<byte[]>(
                name: "FileContent",
                table: "ContractFiles",
                type: "varbinary(max)",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(max)"
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "ShipUnavailable", table: "Cruises");

            migrationBuilder.DropColumn(name: "Title", table: "Cruises");

            migrationBuilder.AddColumn<byte[]>(
                name: "ScanContent",
                table: "Contracts",
                type: "varbinary(max)",
                nullable: true
            );

            migrationBuilder.AddColumn<string>(
                name: "ScanName",
                table: "Contracts",
                type: "nvarchar(1024)",
                maxLength: 1024,
                nullable: true
            );

            migrationBuilder.AlterColumn<string>(
                name: "FileName",
                table: "ContractFiles",
                type: "nvarchar(1024)",
                maxLength: 1024,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(1024)",
                oldMaxLength: 1024,
                oldNullable: true
            );

            migrationBuilder.AlterColumn<byte[]>(
                name: "FileContent",
                table: "ContractFiles",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0],
                oldClrType: typeof(byte[]),
                oldType: "varbinary(max)",
                oldNullable: true
            );
        }
    }
}
