import { useForm } from '@tanstack/react-form';
import { getRouteApi } from '@tanstack/react-router';
import { Suspense } from 'react';

import { AppLayout } from '@/core/components/AppLayout';
import { AppLoader } from '@/core/components/AppLoader';
import { CruiseFrom } from '@/cruise-schedule/components/cruise-from/CruiseFrom';
import { useCruiseApplicationsForCruiseQuery, useCruiseQuery } from '@/cruise-schedule/hooks/CruisesApiHooks';
import { CruiseDto } from '@/cruise-schedule/models/CruiseDto';
import { CruiseFormDto } from '@/cruise-schedule/models/CruiseFormDto';

export function CruiseDetailsPage() {
  const { cruiseId } = getRouteApi('/cruises/$cruiseId/').useParams();

  const cruisesQuery = useCruiseQuery(cruiseId);
  const applicationQuery = useCruiseApplicationsForCruiseQuery();

  const form = useForm<CruiseFormDto>({
    defaultValues: mapCruiseToForm(cruisesQuery.data),
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
                cruiseApplications: applicationQuery.data,
                isReadonly: true,
              }}
            />
          </form>
        </Suspense>
      </AppLayout>
    </>
  );
}

function mapCruiseToForm(cruise: CruiseDto): CruiseFormDto {
  return {
    startDate: cruise.startDate,
    endDate: cruise.endDate,
    managersTeam: {
      mainCruiseManagerId: cruise.mainCruiseManagerId,
      mainDeputyManagerId: cruise.mainDeputyManagerId,
    },
    cruiseApplicationsIds: cruise.cruiseApplicationsShortInfo.map((x) => x.id),
  };
}
