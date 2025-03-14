import { Suspense, useState } from 'react';

import { AppButton } from '@/core/components/AppButton';
import { AppLayout } from '@/core/components/AppLayout';
import { AppLoader } from '@/core/components/AppLoader';
import { AppModal } from '@/core/components/AppModal';
import { AppTabs } from '@/core/components/AppTabs';
import { useAppContext } from '@/core/hooks/AppContextHook';
import { CruiseCalendar } from '@/cruise-schedule/components/CruiseCalendar';
import { CruiseExportForm } from '@/cruise-schedule/components/CruiseExportForm';
import { CruisesTable } from '@/cruise-schedule/components/CruisesTable';
import {
  useAutoAddCruisesMutation,
  useCruisesQuery,
  useDeleteCruiseMutation,
} from '@/cruise-schedule/hooks/CruisesApiHooks';
import { CruiseDto } from '@/cruise-schedule/models/CruiseDto';

export function CruisesPage() {
  const cruisesQuery = useCruisesQuery();
  const deleteCruiseMutation = useDeleteCruiseMutation();
  const autoAddCruisesMutation = useAutoAddCruisesMutation();
  const appContext = useAppContext();

  const [cruiseSelectedForDeletion, setCruiseSelectedForDeletion] = useState<CruiseDto | undefined>(undefined);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  async function autoAddCruises() {
    await autoAddCruisesMutation.mutateAsync(undefined, {
      onSuccess: () => {
        appContext.showAlert({
          title: 'Operacja zakończona sukcesem',
          message: 'Rejsy zostały dodane automatycznie',
          variant: 'success',
        });
      },
      onError: () => {
        appContext.showAlert({
          title: 'Wystąpił błąd',
          message: 'Proces dodawania rejsów automatycznie zakończył się niepowodzeniem',
          variant: 'danger',
        });
      },
    });
  }

  const buttons = [
    <AppButton key="autoAddCruises" onClick={autoAddCruises} variant="primaryOutline">
      Dodaj rejsy automatycznie
    </AppButton>,
    <AppButton key="newCruise" type="link" href="/cruises/new">
      Nowy rejs
    </AppButton>,
    <AppButton key="exportCruises" onClick={() => setIsExportModalOpen(true)} variant="primaryOutline">
      Eksport
    </AppButton>,
  ];

  return (
    <>
      <AppLayout title="Rejsy">
        <Suspense fallback={<AppLoader />}>
          <AppTabs tabNames={['Lista rejsów', 'Kalendarz']}>
            <CruisesTable cruises={cruisesQuery.data} buttons={buttons} deleteCruise={setCruiseSelectedForDeletion} />
            <CruiseCalendar cruises={cruisesQuery.data} buttons={buttons} />
          </AppTabs>
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
            variant="danger"
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

      <AppModal title={`Eksportuj rejsy`} isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)}>
        <CruiseExportForm cruises={cruisesQuery.data} onDone={() => setIsExportModalOpen(false)} />
      </AppModal>
    </>
  );
}
