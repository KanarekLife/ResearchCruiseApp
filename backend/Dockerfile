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

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine

RUN apk add --no-cache curl icu-libs tzdata
HEALTHCHECK --interval=3s --timeout=3s --start-period=5s --retries=10 CMD [ "curl",  "--fail", "http://localhost:8080/health" ]

# Doesn't work with version 1.10+
ARG OTEL_VERSION=1.9.0
ENV OTEL_DOTNET_AUTO_HOME=/otel-dotnet-auto
ADD https://github.com/open-telemetry/opentelemetry-dotnet-instrumentation/releases/download/v${OTEL_VERSION}/otel-dotnet-auto-install.sh otel-dotnet-auto-install.sh
RUN sh otel-dotnet-auto-install.sh && chmod +x /otel-dotnet-auto/instrument.sh

USER $APP_UID
EXPOSE 8080
EXPOSE 8081

WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["/otel-dotnet-auto/instrument.sh", "dotnet", "./ResearchCruiseApp.dll"]
