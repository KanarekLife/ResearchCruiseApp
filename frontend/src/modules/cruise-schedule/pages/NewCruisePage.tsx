import { useForm } from '@tanstack/react-form';
import { Suspense } from 'react';

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
            />
            <button type="submit" onClick={() => console.log(form.state.values)}>
              Submit
            </button>
          </form>
        </Suspense>
      </AppLayout>
    </>
  );
}
