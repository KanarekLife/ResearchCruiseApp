import { Suspense } from 'react';

import { AppLayout } from '@/core/components/AppLayout';
import { AppLoader } from '@/core/components/AppLoader';
import { CruisesTable } from '@/cruise-schedule/components/CruisesTable';
import { useCruisesQuery, useDeleteCruiseMutation } from '@/cruise-schedule/hooks/CruisesApiHooks';

export function CruisesPage() {
  const cruisesQuery = useCruisesQuery();
  const deleteCruiseMutation = useDeleteCruiseMutation();

  return (
    <AppLayout title="Rejsy">
      <Suspense fallback={<AppLoader />}>
        <CruisesTable cruises={cruisesQuery.data} deleteCruise={(id) => deleteCruiseMutation.mutateAsync(id)} />
      </Suspense>
    </AppLayout>
  );
}
