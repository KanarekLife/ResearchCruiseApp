import { useForm } from '@tanstack/react-form';
import ArrowClockwiseIcon from 'bootstrap-icons/icons/arrow-clockwise.svg?react';
import FloppyFillIcon from 'bootstrap-icons/icons/floppy-fill.svg?react';
import { Suspense } from 'react';

import { AppButton } from '@/core/components/AppButton';
import { AppLayout } from '@/core/components/AppLayout';
import { AppLoader } from '@/core/components/AppLoader';
import { CruiseFrom } from '@/cruise-schedule/components/cruise-from/CruiseFrom';
import { useCruiseApplicationsForCruiseQuery } from '@/cruise-schedule/hooks/CruisesApiHooks';
import { CruiseFormDto } from '@/cruise-schedule/models/CruiseFormDto';

export function NewCruisePage() {
  const cruiseApplicationsQuery = useCruiseApplicationsForCruiseQuery();

  const form = useForm<CruiseFormDto>({
    defaultValues: {
      startDate: '',
      endDate: '',
      managersTeam: {
        mainCruiseManagerId: '',
        mainDeputyManagerId: '',
      },
      cruiseApplicationsIds: [],
    },
  });

  function handleSubmitting(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    console.log(form.state.values);
  }

  const buttons = (
    <>
      <AppButton className="gap-4 !justify-center w-36 lg:w-64" variant="primaryOutline" onClick={() => form.reset()}>
        <ArrowClockwiseIcon className="h-4 w-4" />
        Wyczyść formularz
      </AppButton>
      <AppButton className="gap-4 !justify-center w-36 lg:w-64" type="submit">
        <FloppyFillIcon className="h-4 w-4" />
        Zapisz
      </AppButton>
    </>
  );

  return (
    <>
      <AppLayout title="Nowy rejs">
        <Suspense fallback={<AppLoader />}>
          <form onSubmit={handleSubmitting}>
            <CruiseFrom
              context={{
                form,
                cruiseApplications: cruiseApplicationsQuery.data,
                isReadonly: false,
              }}
              buttons={buttons}
            />
          </form>
        </Suspense>
      </AppLayout>
    </>
  );
}
