import { FormBActionsSection } from '@/cruise-applications/components/formB/FormBActionsSection';
import { FormBAdditionalPermissionsSection } from '@/cruise-applications/components/formB/FormBAdditionalPermissionsSection';
import { FormBContractsSection } from '@/cruise-applications/components/formB/FormBContractsSection';
import { FormBCruiseGoalSection } from '@/cruise-applications/components/formB/FormBCruiseGoalSection';
import { FormBCruiseInfoSection } from '@/cruise-applications/components/formB/FormBCruiseInfoSection';
import { FormBCruiseManagerInfoSection } from '@/cruise-applications/components/formB/FormBCruiseManagerInfoSection';
import { FormBMembersSection } from '@/cruise-applications/components/formB/FormBMembersSection';
import { FormBPublicationsSection } from '@/cruise-applications/components/formB/FormBPublicationsSection';
import { FormBResearchAreaSection } from '@/cruise-applications/components/formB/FormBResearchAreaSection';
import { FormBResearchTasksSection } from '@/cruise-applications/components/formB/FormBResearchTasksSection';
import { FormBShipUsageSection } from '@/cruise-applications/components/formB/FormBShipUsageSection';
import { FormBSPUBTasksSection } from '@/cruise-applications/components/formB/FormBSPUBTasksSection';
import { FormBContextType, FormBProvider } from '@/cruise-applications/contexts/FormBContext';

type Props = {
  context: FormBContextType & {
    onSubmit: () => void;
    onSaveDraft: () => void;
  };
};
export function FormB({ context }: Props) {
  function onSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    context.onSubmit();
  }

  return (
    <FormBProvider value={context}>
      <form className="space-y-8" onSubmit={onSubmit}>
        <FormBCruiseInfoSection />
        <FormBCruiseManagerInfoSection />
        <FormBShipUsageSection />
        <FormBAdditionalPermissionsSection />
        <FormBResearchAreaSection />
        <FormBCruiseGoalSection />
        <FormBResearchTasksSection />
        <FormBContractsSection />
        <FormBMembersSection />
        <FormBPublicationsSection />
        <FormBSPUBTasksSection />
        <FormBActionsSection onSaveDraft={context.onSaveDraft} />
      </form>
    </FormBProvider>
  );
}
