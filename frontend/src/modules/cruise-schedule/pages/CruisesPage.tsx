import { Suspense, useState } from 'react';

import { AppButton } from '@/core/components/AppButton';
import { AppLayout } from '@/core/components/AppLayout';
import { AppLoader } from '@/core/components/AppLoader';
import { AppModal } from '@/core/components/AppModal';
import { CruisesTable } from '@/cruise-schedule/components/CruisesTable';
import { useCruisesQuery, useDeleteCruiseMutation } from '@/cruise-schedule/hooks/CruisesApiHooks';
import { CruiseDto } from '@/cruise-schedule/models/CruiseDto';

export function CruisesPage() {
  const cruisesQuery = useCruisesQuery();
  const deleteCruiseMutation = useDeleteCruiseMutation();

  const [cruiseSelectedForDeletion, setCruiseSelectedForDeletion] = useState<CruiseDto | undefined>(undefined);

  return (
    <>
      <AppLayout title="Rejsy">
        <Suspense fallback={<AppLoader />}>
          <CruisesTable cruises={cruisesQuery.data} deleteCruise={setCruiseSelectedForDeletion} />
        </Suspense>
      </AppLayout>

      <AppModal
        title={`Potwierdź usunięcie rejsu nr. ${cruiseSelectedForDeletion?.number}`}
        isOpen={!!cruiseSelectedForDeletion}
        onClose={() => setCruiseSelectedForDeletion(undefined)}
      >
        Usunięcie rejsu jest nieodwracalne.
        <div className="flex flex-row gap-4 mt-4">
          <AppButton
            variant="dangerOutline"
            className="basis-2/3"
            onClick={async () => {
              await deleteCruiseMutation.mutateAsync(cruiseSelectedForDeletion!.id!);
              setCruiseSelectedForDeletion(undefined);
            }}
            disabled={deleteCruiseMutation.isPending}
          >
            Usuń rejs nr. {cruiseSelectedForDeletion?.number}
          </AppButton>
          <AppButton
            variant="primaryOutline"
            className="basis-1/3"
            onClick={() => {
              setCruiseSelectedForDeletion(undefined);
            }}
            disabled={deleteCruiseMutation.isPending}
          >
            Anuluj
          </AppButton>
        </div>
      </AppModal>
    </>
  );
}
