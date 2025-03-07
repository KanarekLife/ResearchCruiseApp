import { useForm } from '@tanstack/react-form';
import { getRouteApi } from '@tanstack/react-router';
import ArrowClockwiseIcon from 'bootstrap-icons/icons/arrow-clockwise.svg?react';
import CheckLgIcon from 'bootstrap-icons/icons/check-lg.svg?react';
import FloppyFillIcon from 'bootstrap-icons/icons/floppy-fill.svg?react';
import PencilIcon from 'bootstrap-icons/icons/pencil.svg?react';
import XLgIcon from 'bootstrap-icons/icons/x-lg.svg?react';
import React, { Suspense } from 'react';

import { AppButton } from '@/core/components/AppButton';
import { AppLayout } from '@/core/components/AppLayout';
import { AppLoader } from '@/core/components/AppLoader';
import { AppModal } from '@/core/components/AppModal';
import { CruiseFrom } from '@/cruise-schedule/components/cruise-from/CruiseFrom';
import {
  useConfirmCruiseMutation,
  useCruiseApplicationsForCruiseQuery,
  useCruiseQuery,
  useEndCruiseMutation,
} from '@/cruise-schedule/hooks/CruisesApiHooks';
import { CruiseDto } from '@/cruise-schedule/models/CruiseDto';
import { CruiseFormDto } from '@/cruise-schedule/models/CruiseFormDto';

export function CruiseDetailsPage() {
  const { cruiseId } = getRouteApi('/cruises/$cruiseId/').useParams();

  const cruisesQuery = useCruiseQuery(cruiseId);
  const applicationQuery = useCruiseApplicationsForCruiseQuery();
  const confirmCruiseMutation = useConfirmCruiseMutation(cruiseId);
  const endCruiseMutation = useEndCruiseMutation(cruiseId);

  const [editMode, setEditMode] = React.useState(false);
  const [isConfirmAcceptanceModalOpen, setIsConfirmAcceptanceModalOpen] = React.useState(false);
  const [isConfirmCruiseEndModalOpen, setIsConfirmCruiseEndModalOpen] = React.useState(false);

  const form = useForm<CruiseFormDto>({
    defaultValues: mapCruiseToForm(cruisesQuery.data),
  });

  function getButtons() {
    switch (cruisesQuery.data?.status) {
      case 'Nowy':
        return editMode ? (
          <>
            <AppButton
              className="gap-4 !justify-center w-36 lg:w-48"
              variant="primaryOutline"
              onClick={() => {
                form.reset();
                setEditMode(false);
              }}
            >
              <XLgIcon className="h-4 w-4" />
              Anuluj
            </AppButton>
            <AppButton
              className="gap-4 !justify-center w-36 lg:w-48"
              variant="primaryOutline"
              onClick={() => form.reset()}
            >
              <ArrowClockwiseIcon className="h-4 w-4" />
              Cofnij zmiany
            </AppButton>
            <AppButton className="gap-4 !justify-center w-36 lg:w-48">
              <FloppyFillIcon className="h-4 w-4" />
              Zapisz rejs
            </AppButton>
          </>
        ) : (
          <>
            <AppButton
              className="gap-4 !justify-center w-36 lg:w-64"
              variant="primaryOutline"
              onClick={() => setEditMode(true)}
            >
              <PencilIcon className="h-4 w-4" />
              Edytuj
            </AppButton>
            <AppButton
              className="gap-4 !justify-center w-36 lg:w-64"
              onClick={() => setIsConfirmAcceptanceModalOpen(true)}
            >
              <CheckLgIcon className="h-4 w-4" />
              Zatwierdź rejs
            </AppButton>
          </>
        );
      case 'Potwierdzony':
        return (
          <AppButton
            className="gap-4 !justify-center w-64 lg:w-96"
            onClick={() => setIsConfirmCruiseEndModalOpen(true)}
          >
            <CheckLgIcon className="h-4 w-4" />
            Oznacz rejs jako zakończony
          </AppButton>
        );
      default:
        return null;
    }
  }

  return (
    <>
      <AppLayout title={`Szczegóły rejsu nr. ${cruisesQuery.data?.number}`}>
        <Suspense fallback={<AppLoader />}>
          <CruiseFrom
            context={{
              form,
              cruise: cruisesQuery.data,
              cruiseApplications: applicationQuery.data,
              isReadonly: !editMode,
            }}
            buttons={getButtons()}
          />
        </Suspense>
      </AppLayout>

      <AppModal
        title={`Czy na pewno chcesz zatwierdzić rejs nr. ${cruisesQuery.data?.number}?`}
        isOpen={isConfirmAcceptanceModalOpen}
        onClose={() => setIsConfirmAcceptanceModalOpen(false)}
      >
        <div className="flex flex-row gap-4 mt-4">
          <AppButton
            variant="successOutline"
            className="basis-2/3"
            onClick={async () => {
              await confirmCruiseMutation.mutateAsync();
              setIsConfirmAcceptanceModalOpen(false);
            }}
            disabled={confirmCruiseMutation.isPending}
          >
            Potwierdź rejs nr. {cruisesQuery.data?.number}
          </AppButton>
          <AppButton
            variant="primaryOutline"
            className="basis-1/3"
            onClick={() => {
              setIsConfirmAcceptanceModalOpen(false);
            }}
            disabled={confirmCruiseMutation.isPending}
          >
            Anuluj
          </AppButton>
        </div>
      </AppModal>

      <AppModal
        title={`Czy na pewno chcesz oznaczyć rejs nr. ${cruisesQuery.data?.number} jako zakończony?`}
        isOpen={isConfirmCruiseEndModalOpen}
        onClose={() => setIsConfirmCruiseEndModalOpen(false)}
      >
        <div className="flex flex-row gap-4 mt-4">
          <AppButton
            variant="successOutline"
            className="basis-2/3"
            onClick={async () => {
              await endCruiseMutation.mutateAsync();
              setIsConfirmCruiseEndModalOpen(false);
            }}
            disabled={endCruiseMutation.isPending}
          >
            Oznacz rejs nr. {cruisesQuery.data?.number} jako zakończony
          </AppButton>
          <AppButton
            variant="primaryOutline"
            className="basis-1/3"
            onClick={() => {
              setIsConfirmCruiseEndModalOpen(false);
            }}
            disabled={endCruiseMutation.isPending}
          >
            Anuluj
          </AppButton>
        </div>
      </AppModal>
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
