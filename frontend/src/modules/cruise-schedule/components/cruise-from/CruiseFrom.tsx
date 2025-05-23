import { AppActionsSection } from '@/core/components/AppActionsSection';
import { AppGuard } from '@/core/components/AppGuard';
import { Role } from '@/core/models/Role';
import { CruiseFormApplicationsSection } from '@/cruise-schedule/components/cruise-from/CruiseFormApplications';
import { CruiseFormBasicInformationSection } from '@/cruise-schedule/components/cruise-from/CruiseFormBasicInformation';
import { CruiseFormDateSelectionSection } from '@/cruise-schedule/components/cruise-from/CruiseFormDateSelection';
import { CruiseFormManagerSelectionSection } from '@/cruise-schedule/components/cruise-from/CruiseFormManagerSelection';
import { CruiseFormProvider, CruiseFromContextType } from '@/cruise-schedule/contexts/CruiseFormContext';

type Props = {
  context: CruiseFromContextType;
  buttons: React.ReactNode;

  onSubmit?: () => void;
};

export function CruiseFrom({ context, buttons, onSubmit }: Props) {
  return (
    <CruiseFormProvider value={context}>
      <form
        className="space-y-8"
        onSubmit={(evt) => {
          evt.preventDefault();
          onSubmit?.();
        }}
      >
        <CruiseFormBasicInformationSection />
        <CruiseFormDateSelectionSection />
        <CruiseFormManagerSelectionSection />
        <CruiseFormApplicationsSection />
        <AppGuard allowedRoles={[Role.ShipOwner, Role.Administrator]}>
          <AppActionsSection children={buttons} />
        </AppGuard>
      </form>
    </CruiseFormProvider>
  );
}
