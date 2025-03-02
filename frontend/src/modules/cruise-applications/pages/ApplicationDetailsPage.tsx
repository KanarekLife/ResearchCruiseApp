import { getRouteApi } from '@tanstack/react-router';
import { Suspense } from 'react';

import { AppLayout } from '@/core/components/AppLayout';
import { AppLoader } from '@/core/components/AppLoader';
import { useCruiseApplicationQuery, useEvaluationQuery } from '@/cruise-applications/hooks/CruiseApplicationsApiHooks';
import { ApplicationDetails } from '../components/application-details/ApplicationDetails';

export function ApplicationDetailsPage() {
  const { applicationId } = getRouteApi('/applications/$applicationId/details').useParams();
  const applicationQuery = useCruiseApplicationQuery(applicationId);
  const evaluationQuery = useEvaluationQuery(applicationId);

  return (
    <AppLayout title="Szczegóły Zgłoszenia" variant="defaultWithoutCentering">
      <Suspense fallback={<AppLoader />}>
        <ApplicationDetails applicationQuery={applicationQuery} evaluationQuery={evaluationQuery} />
      </Suspense>
    </AppLayout>
  );
}
