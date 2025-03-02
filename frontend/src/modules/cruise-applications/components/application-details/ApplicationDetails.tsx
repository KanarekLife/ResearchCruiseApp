import { CruiseApplicationDto } from "@/cruise-applications/models/CruiseApplicationDto";
import { EvaluationDto } from "@/cruise-applications/models/EvaluationDto";
import { ApplicationDetailsInformationSection } from "./ApplicationDetailsInformationSection";
import { ApplicationDetailsResearchTasksSection } from "./ApplicationDetailsResearchTasksSection";
import { ApplicationDetailsEffectPointsSection } from "./ApplicationDetailsEffectPointsSection";
import { ApplicationDetailsContractsSection } from "./ApplicationDetailsContractsSection";
import { ApplicationDetailsMembersSection } from "./ApplicationDetailsMembersSection";
import { ApplicationDetailsPublicationsSection } from "./ApplicationDetailsPublicationsSection";
import { ApplicationDetailsSPUBTasksSection } from "./ApplicationDetailsSPUBTasksSection";
import { ApplicationDetailsActionsSection } from "./ApplicationDetailsActionsSection";
import { useAppContext } from "@/core/hooks/AppContextHook";
import { useRejectApplicationMutation } from "@/cruise-applications/hooks/CruiseApplicationsApiHooks";
import { UseSuspenseQueryResult } from "@tanstack/react-query";

type Props = {
  applicationQuery: UseSuspenseQueryResult<CruiseApplicationDto>;
  evaluationQuery: UseSuspenseQueryResult<EvaluationDto>;
}
export function ApplicationDetails({applicationQuery, evaluationQuery}: Props) {
    const appContext = useAppContext();
    const rejectMutation = useRejectApplicationMutation();
    const application = applicationQuery.data;
    const evaluation = evaluationQuery.data;

    const rejectApplication = () => {
      rejectMutation.mutate(
        application.id,
        {
          onSuccess: () => {
            applicationQuery.refetch();
            evaluationQuery.refetch();
            appContext.showAlert({
              title: 'Formularz pomyślnie odrzucony',
              message: 'Formularz został odrzucony.',
              variant: 'success',
            });
          },
          onError: (err) => {
            console.error(err);
            appContext.showAlert({
              title: 'Wystąpił błąd',
              message: 'Nie udało się odrzucić formularza.',
              variant: 'danger',
            });
          },
        }
      );
    };

    return (
      <>
        <ApplicationDetailsInformationSection application={application} />
        <ApplicationDetailsResearchTasksSection researchTasks={evaluation.formAResearchTasks} />
        <ApplicationDetailsEffectPointsSection effectPoints={evaluation.effectsPoints} />
        <ApplicationDetailsContractsSection contracts={evaluation.formAContracts} />
        <ApplicationDetailsMembersSection ugTeams={evaluation.ugTeams} guestTeams={evaluation.guestTeams} ugUnitsPoints={evaluation.ugUnitsPoints} />
        <ApplicationDetailsPublicationsSection publications={evaluation.formAPublications} />
        <ApplicationDetailsSPUBTasksSection spubTasks={evaluation.formASpubTasks} />
        <ApplicationDetailsActionsSection application={application} onReject={rejectApplication} />
      </>
    );
  }
