import { useForm } from '@tanstack/react-form';
import { getRouteApi, useNavigate } from '@tanstack/react-router';
import { Suspense } from 'react';

import { AppLayout } from '@/core/components/AppLayout';
import { AppLoader } from '@/core/components/AppLoader';
import { useAppContext } from '@/core/hooks/AppContextHook';
import {
  useFormAForSupervisorQuery,
  useSupervisorAnswerFormAMutation,
  useFormAForSupervisorInitValuesQuery,
} from '@/cruise-applications/hooks/FormAApiHooks';
import { FormADto } from '@/cruise-applications/models/FormADto';
import { FormAProvider } from '@/cruise-applications/contexts/FormAContext';
import { FormACruiseManagerInfoSection } from '@/cruise-applications/components/formA/FormACruiseManagerInfoSection';
import { FormACruiseLengthSection } from '@/cruise-applications/components/formA/FormACruiseLengthSection';
import { FormAPermissionsSection } from '@/cruise-applications/components/formA/FormAPermissionsSection';
import { FormAResearchAreaSection } from '@/cruise-applications/components/formA/FormAResearchAreaSection';
import { FormACruiseGoalSection } from '@/cruise-applications/components/formA/FormACruiseGoalSection';
import { FormAResearchTasksSection } from '@/cruise-applications/components/formA/FormAResearchTasksSection';
import { FormAContractsSection } from '@/cruise-applications/components/formA/FormAContractsSection';
import { FormAMembersSection } from '@/cruise-applications/components/formA/FormAMembersSection';
import { FormAPublicationsSection } from '@/cruise-applications/components/formA/FormAPublicationsSection';
import { FormASPUBTasksSection } from '@/cruise-applications/components/formA/FormASPUBTasksSection';
import { FormASupervisorInfoSection } from '@/cruise-applications/components/formA/FormASupervisorInfoSection';
import { FormAForSupervisorActionsSection } from '@/cruise-applications/components/formA/FormAForSupervisorActionsSection';

export function FormAForSupervisorPage() {
  const { cruiseApplicationId, supervisorCode } = getRouteApi('/formaforsupervisor').useSearch();
  const navigate = useNavigate();

  if (!cruiseApplicationId || !supervisorCode) {
    return navigate({ to: '/' });
  }

  const appContext = useAppContext();
  const initialStateQuery = useFormAForSupervisorInitValuesQuery({ cruiseId: cruiseApplicationId, supervisorCode });
  const answerMutation = useSupervisorAnswerFormAMutation();
  const formA = useFormAForSupervisorQuery({ cruiseId: cruiseApplicationId, supervisorCode });

  const form = useForm<FormADto>({
    defaultValues: formA.data ?? {
      id: undefined,
      cruiseManagerId: '',
      deputyManagerId: '',
      year: initialStateQuery.data.years[0],
      acceptablePeriod: ['0', '24'],
      optimalPeriod: ['0', '24'],
      cruiseHours: '0',
      periodNotes: '',
      shipUsage: '',
      differentUsage: '',
      permissions: [],
      researchAreaId: '',
      researchAreaInfo: '',
      cruiseGoal: '',
      cruiseGoalDescription: '',
      researchTasks: [],
      contracts: [],
      ugTeams: [],
      guestTeams: [],
      publications: [],
      spubTasks: [],
      supervisorEmail: '',
      note: '',
    },
  });

  function handleAcceptForm() {
    answerMutation.mutate(
      { id: cruiseApplicationId!, accept: true, supervisorCode: supervisorCode! },
      {
        onSuccess: () => {
          navigate({ to: '/' });
          appContext.showAlert({
            title: 'Zaakceptowano zgłoszenie',
            message: 'Zgłoszenie zostało zaakceptowane',
            variant: 'success',
          });
        },
        onError: (err: any) => {
          console.error(err);
          if (err.response?.status === 403) {
            appContext.showAlert({
              title: 'Niedozwolona operacja',
              message: err.response?.data,
              variant: 'danger',
            });
          } else {
            appContext.showAlert({
              title: 'Wystąpił błąd',
              message: 'Nie udało się zaakceptować zgłoszenia',
              variant: 'danger',
            });
          }
        },
      }
    );
  }

  function handleDenyForm() {
    answerMutation.mutate(
      { id: cruiseApplicationId!, accept: false, supervisorCode: supervisorCode! },
      {
        onSuccess: () => {
          navigate({ to: '/' });
          appContext.showAlert({
            title: 'Odrzucono zgłoszenie',
            message: 'Zgłoszenie zostało odrzucone',
            variant: 'success',
          });
        },
        onError: (err: any) => {
          console.error(err);
          if (err.response?.status === 403) {
            appContext.showAlert({
              title: 'Niedozwolona operacja',
              message: err.response?.data,
              variant: 'danger',
            });
          } else {
            appContext.showAlert({
              title: 'Wystąpił błąd',
              message: 'Nie udało się odrzucić zgłoszenia',
              variant: 'danger',
            });
          }
        },
      }
    );
  }

  return (
    <>
      <AppLayout title="Formularz A">
        <Suspense fallback={<AppLoader />}>
          <div className="space-y-8">
            <FormAProvider
              value={{ form, initValues: initialStateQuery.data, isReadonly: true, hasFormBeenSubmitted: false }}
            >
              <FormACruiseManagerInfoSection />
              <FormACruiseLengthSection />
              <FormAPermissionsSection />
              <FormAResearchAreaSection />
              <FormACruiseGoalSection />
              <FormAResearchTasksSection />
              <FormAContractsSection />
              <FormAMembersSection />
              <FormAPublicationsSection />
              <FormASPUBTasksSection />
              <FormASupervisorInfoSection />
              <FormAForSupervisorActionsSection onAccept={handleAcceptForm} onDeny={handleDenyForm} />
            </FormAProvider>
          </div>
        </Suspense>
      </AppLayout>
    </>
  );
}
