import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import FloppyFillIcon from 'bootstrap-icons/icons/floppy-fill.svg?react';
import { Suspense, useState } from 'react';

import { AppButton } from '@/core/components/AppButton';
import { AppLayout } from '@/core/components/AppLayout';
import { AppLoader } from '@/core/components/AppLoader';
import { AppModal } from '@/core/components/AppModal';
import { AppInput } from '@/core/components/inputs/AppInput';
import { useAppContext } from '@/core/hooks/AppContextHook';
import { getErrors, removeEmptyValues } from '@/core/lib/utils';
import { FormA } from '@/cruise-applications/components/formA/FormA';
import { getFormAValidationSchema } from '@/cruise-applications/helpers/FormAValidationSchema';
import { useFormAInitValuesQuery, useSaveFormAMutation } from '@/cruise-applications/hooks/FormAApiHooks';
import { FormADto } from '@/cruise-applications/models/FormADto';
import { useUserContext } from '@/user/hooks/UserContextHook';

export function NewCruisePage() {
  const navigate = useNavigate();
  const appContext = useAppContext();
  const userContext = useUserContext();
  const [hasFormBeenSubmitted, setHasFormBeenSubmitted] = useState(false);
  const [isSaveDraftModalOpen, setIsSaveDraftModalOpen] = useState(false);
  const initialStateQuery = useFormAInitValuesQuery();
  const saveDraftMutation = useSaveFormAMutation();
  const form = useForm<FormADto>({
    defaultValues: {
      id: undefined,
      cruiseManagerId: userContext.currentUser!.id,
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
    validators: {
      onChange: getFormAValidationSchema(initialStateQuery.data),
    },
    onSubmit: ({ value }) => {
      const dto = removeEmptyValues(value, [
        'year',
        'periodNotes',
        'differentUsage',
        'supervisorEmail',
        'cruiseGoalDescription',
      ]);

      if (dto.cruiseManagerId !== userContext.currentUser!.id && dto.deputyManagerId !== userContext.currentUser!.id) {
        setIsSaveDraftModalOpen(false);
        appContext.showAlert({
          title: 'Wykryto błąd w formularzu',
          message: 'Jedynie kierownik lub jego zastępca mogą zapisać formularz',
          variant: 'danger',
        });
        return;
      }

      saveDraftMutation.mutate(
        { form: dto, draft: false },
        {
          onSuccess: () => {
            navigate({ to: '/' });
            appContext.showAlert({
              title: 'Formularz przyjęty',
              message: 'Formularz został zapisany i wysłany do potwierdzenia przez przełożonego',
              variant: 'success',
            });
          },
          onError: (err) => {
            console.error(err);
            appContext.showAlert({
              title: 'Wystąpił błąd',
              message: 'Nie udało się zapisać formularza',
              variant: 'danger',
            });
          },
          onSettled: () => setIsSaveDraftModalOpen(false),
        }
      );
    },
  });

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    evt.stopPropagation();
    setHasFormBeenSubmitted(true);
    form.handleSubmit();
  }

  function handleSaveDraft() {
    const dto = removeEmptyValues(form.state.values, [
      'year',
      'periodNotes',
      'differentUsage',
      'supervisorEmail',
      'cruiseGoalDescription',
    ]);

    if (dto.cruiseManagerId !== userContext.currentUser!.id && dto.deputyManagerId !== userContext.currentUser!.id) {
      setIsSaveDraftModalOpen(false);
      appContext.showAlert({
        title: 'Wykryto błąd w formularzu',
        message: 'Jedynie kierownik lub jego zastępca mogą zapisać formularz',
        variant: 'danger',
      });
      return;
    }

    saveDraftMutation.mutate(
      { form: dto, draft: true },
      {
        onSuccess: () => {
          navigate({ to: '/' });
          appContext.showAlert({
            title: 'Zapisano formularz',
            message: 'Formularz został zapisany w wersji roboczej',
            variant: 'success',
          });
        },
        onError: (err) => {
          console.error(err);
          appContext.showAlert({
            title: 'Wystąpił błąd',
            message: 'Nie udało się zapisać formularza',
            variant: 'danger',
          });
        },
        onSettled: () => setIsSaveDraftModalOpen(false),
      }
    );
  }

  return (
    <>
      <div>
        <AppLayout title="Formularz A" variant="defaultWithoutCentering">
          <Suspense fallback={<AppLoader />}>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <FormA
                context={{ form, initValues: initialStateQuery.data, isReadonly: false, hasFormBeenSubmitted }}
                onSaveDraft={() => setIsSaveDraftModalOpen(true)}
              />
            </form>
          </Suspense>
        </AppLayout>
      </div>

      <AppModal title="Zapisz Formularz A" isOpen={isSaveDraftModalOpen} onClose={() => setIsSaveDraftModalOpen(false)}>
        <div className="space-y-4">
          <form.Field
            name="note"
            children={(field) => (
              <AppInput
                name={field.name}
                value={field.state.value ?? ''}
                onBlur={field.handleBlur}
                onChange={field.handleChange}
                label="Notatka aktualnej wersji roboczej"
                placeholder="Wpisz notatkę dot. aktualnej wersji roboczej"
                errors={getErrors(field.state.meta)}
                autoFocus
                required
              />
            )}
          />

          <div className="flex justify-center gap-4">
            <AppButton className="gap-4" disabled={saveDraftMutation.isPending} onClick={handleSaveDraft}>
              <FloppyFillIcon className="h-4 w-4" />
              Zapisz
            </AppButton>
          </div>
        </div>
      </AppModal>
    </>
  );
}
