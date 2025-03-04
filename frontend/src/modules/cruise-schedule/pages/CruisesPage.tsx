import React, { Suspense } from 'react';

import { AppLayout } from '@/core/components/AppLayout';
import { AppLoader } from '@/core/components/AppLoader';
import { CruisesTable } from '@/cruise-schedule/components/CruisesTable';
import { useCruisesQuery, useDeleteCruiseMutation } from '@/cruise-schedule/hooks/CruisesApiHooks';
import { CruiseDto } from '@/cruise-schedule/models/CruiseDto';

function compareCruiseDto(a: CruiseDto, b: CruiseDto) {
  const [aYear, aNumber] = a.number.split('/').map(Number);
  const [bYear, bNumber] = b.number.split('/').map(Number);

  if (aYear !== bYear) {
    return aYear - bYear;
  }
  return aNumber - bNumber;
}

export function CruisesPage() {
  const cruisesQuery = useCruisesQuery();
  const deleteCruiseMutation = useDeleteCruiseMutation();

  const sortedData = React.useMemo(() => cruisesQuery.data.sort(compareCruiseDto).reverse(), [cruisesQuery.data]);

  return (
    <AppLayout title="Rejsy">
      <Suspense fallback={<AppLoader />}>
        <CruisesTable cruises={sortedData} deleteCruise={(id) => deleteCruiseMutation.mutateAsync(id)} />
      </Suspense>
    </AppLayout>
  );
}
