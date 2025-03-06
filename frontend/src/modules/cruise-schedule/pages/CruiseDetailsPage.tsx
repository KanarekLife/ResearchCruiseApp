import { useForm } from '@tanstack/react-form';
import { getRouteApi } from '@tanstack/react-router';
import { Suspense } from 'react';

import { AppLayout } from '@/core/components/AppLayout';
import { AppLoader } from '@/core/components/AppLoader';
import { CruiseFrom } from '@/cruise-schedule/components/cruise-from/CruiseFrom';
import { useCruiseQuery } from '@/cruise-schedule/hooks/CruisesApiHooks';
import { CruiseFormDto } from '@/cruise-schedule/models/CruiseFormDto';

export function CruiseDetailsPage() {
  const { cruiseId } = getRouteApi('/cruises/$cruiseId/').useParams();

  const cruisesQuery = useCruiseQuery(cruiseId);

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
      <AppLayout title={`Szczegóły rejsu nr. ${cruisesQuery.data?.number}`}>
        <Suspense fallback={<AppLoader />}>
          <form onSubmit={handleSubmitting}>
            <CruiseFrom
              context={{
                form,
                cruise: cruisesQuery.data,
                isReadonly: false,
              }}
            />
          </form>
        </Suspense>
      </AppLayout>
    </>
  );
}
