import CheckLgIcon from 'bootstrap-icons/icons/check-lg.svg?react';
import TrashFillIcon from 'bootstrap-icons/icons/trash-fill.svg?react';
import React from 'react';

import { AppActionsSection } from '@/core/components/AppActionsSection';
import { AppButton } from '@/core/components/AppButton';
import { useApplicationDetails } from '@/cruise-applications/contexts/ApplicationDetailsContext';
import { CruiseApplicationStatus } from '@/cruise-applications/models/CruiseApplicationDto';

type Props = {
  onAccept: () => void;
  onReject: () => void;
};
export function ApplicationDetailsActionsSection({ onAccept, onReject }: Props) {
  const { application } = useApplicationDetails();
  const [confirmationMode, setConfirmationMode] = React.useState(false);

  if (confirmationMode) {
    return (
      <AppActionsSection>
        <CancelConfirmation onReject={onReject} setConfirmationMode={setConfirmationMode} />
      </AppActionsSection>
    );
  }

  switch (application.status) {
    case CruiseApplicationStatus.WaitingForSupervisor:
      return (
        <AppActionsSection>
          <CancelAction setConfirmationMode={setConfirmationMode} />
        </AppActionsSection>
      );
    case CruiseApplicationStatus.AcceptedBySupervisor:
      return (
        <AppActionsSection>
          <CancelAction setConfirmationMode={setConfirmationMode} />
          <AcceptAction onAccept={onAccept} />
        </AppActionsSection>
      );
    default:
      return null;
  }
}

type AcceptProps = {
  onAccept: () => void;
};
function AcceptAction({ onAccept }: AcceptProps) {
  return (
    <>
      <AppButton className="gap-4 !justify-center w-36 lg:w-48" variant="primary" onClick={onAccept}>
        <CheckLgIcon className="h-4 w-4" />
        Zaakceptuj zgłoszenie
      </AppButton>
    </>
  );
}

type CancelProps = {
  setConfirmationMode: (value: boolean) => void;
};
function CancelAction({ setConfirmationMode }: CancelProps) {
  return (
    <>
      <AppButton
        className="gap-4 !justify-center w-36 lg:w-48"
        variant="danger"
        onClick={() => setConfirmationMode(true)}
      >
        <TrashFillIcon className="h-4 w-4" />
        Odrzuć zgłoszenie
      </AppButton>
    </>
  );
}

type CancelConfirmationProps = {
  onReject: () => void;
  setConfirmationMode: (value: boolean) => void;
};
function CancelConfirmation({ onReject, setConfirmationMode }: CancelConfirmationProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 text-center text-sm font-semibold">
          Po odrzuceniu wymagane będzie ponowne złożenie wniosku
        </div>
        <AppButton
          type="submit"
          className="gap-4 !justify-center w-36 lg:w-48"
          variant="primary"
          onClick={() => setConfirmationMode(false)}
        >
          Anuluj
        </AppButton>
        <AppButton className="gap-4 !justify-center w-36 lg:w-48" variant="danger" onClick={onReject}>
          <TrashFillIcon className="h-4 w-4" />
          Potwierdź odrzucenie
        </AppButton>
      </div>
    </>
  );
}
