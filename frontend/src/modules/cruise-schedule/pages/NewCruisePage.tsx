import { useForm } from '@tanstack/react-form';
import { Suspense } from 'react';

import { AppLayout } from '@/core/components/AppLayout';
import { AppLoader } from '@/core/components/AppLoader';
import { CruiseFrom } from '@/cruise-schedule/components/cruise-from/CruiseFrom';
import { CruiseFormDto } from '@/cruise-schedule/models/CruiseFormDto';

export function NewCruisePage() {
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
    console.log('Form submitted');
  }

  return (
    <>
      <AppLayout title="Nowy rejs">
        <Suspense fallback={<AppLoader />}>
          <form onSubmit={handleSubmitting}>
            <CruiseFrom
              context={{
                form,
                cruise: undefined,
                isReadonly: false,
              }}
            />
          </form>
        </Suspense>
      </AppLayout>
    </>
  );
}
