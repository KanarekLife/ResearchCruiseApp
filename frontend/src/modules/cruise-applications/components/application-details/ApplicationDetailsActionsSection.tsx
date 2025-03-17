import React from 'react';

import { AppActionsSection } from '@/core/components/AppActionsSection';
import { useApplicationDetails } from '@/cruise-applications/contexts/ApplicationDetailsContext';
import { CruiseApplicationStatus } from '@/cruise-applications/models/CruiseApplicationDto';
import { ApplicationDetailsActionCancelConfirmation } from '@/cruise-applications/components/application-details/actions-section-buttons/ApplicationDetailsActionCancelConfirmation';
import { ApplicationDetailsActionCancel } from '@/cruise-applications/components/application-details/actions-section-buttons/ApplicationDetailsActionCancel';
import { ApplicationDetailsActionAccept } from '@/cruise-applications/components/application-details/actions-section-buttons/ApplicationDetailsActionAccept';

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
        <ApplicationDetailsActionCancelConfirmation onReject={onReject} setConfirmationMode={setConfirmationMode} />
      </AppActionsSection>
    );
  }

  switch (application.status) {
    case CruiseApplicationStatus.WaitingForSupervisor:
      return (
        <AppActionsSection>
          <ApplicationDetailsActionCancel setConfirmationMode={setConfirmationMode} />
        </AppActionsSection>
      );
    case CruiseApplicationStatus.AcceptedBySupervisor:
      return (
        <AppActionsSection>
          <ApplicationDetailsActionCancel setConfirmationMode={setConfirmationMode} />
          <ApplicationDetailsActionAccept onAccept={onAccept} />
        </AppActionsSection>
      );
    default:
      return null;
  }
}

