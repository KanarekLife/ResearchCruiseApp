FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS base

RUN apk add --no-cache curl icu-libs tzdata
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "curl",  "--fail", "http://localhost:8080/health" ]
WORKDIR /app
USER $APP_UID
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build

ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["./ResearchCruiseApp/ResearchCruiseApp.csproj", "ResearchCruiseApp/"]
RUN dotnet restore "ResearchCruiseApp/ResearchCruiseApp.csproj"
COPY . .
WORKDIR "/src/ResearchCruiseApp"
RUN dotnet build "ResearchCruiseApp.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "ResearchCruiseApp.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final

WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ResearchCruiseApp.dll"]
