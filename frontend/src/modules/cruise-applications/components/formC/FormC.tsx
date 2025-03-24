import { FormCAdditionalPermissionsSection } from '@/cruise-applications/components/formC/FormCAdditionalPermissionsSection';
import { FormCCruiseGoalSection } from '@/cruise-applications/components/formC/FormCCruiseGoalSection';
import { FormCCruiseInfoSection } from '@/cruise-applications/components/formC/FormCCruiseInfoSection';
import { FormCCruiseManagerInfoSection } from '@/cruise-applications/components/formC/FormCCruiseManagerInfoSection';
import { FormCResearchAreaSection } from '@/cruise-applications/components/formC/FormCResearchAreaSection';
import { FormCShipUsageSection } from '@/cruise-applications/components/formC/FormCShipUsageSection';
import { FormCContextType, FormCProvider } from '@/cruise-applications/contexts/FormCContext';

type Props = {
  context: FormCContextType & {
    onSubmit: () => void;
    onSaveDraft: () => void;
  };
};
export function FormC({ context }: Props) {
  function onSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    context.onSubmit();
  }

  return (
    <FormCProvider value={context}>
      <form className="space-y-8" onSubmit={onSubmit}>
        <FormCCruiseInfoSection />
        <FormCCruiseManagerInfoSection />
        <FormCShipUsageSection />
        <FormCAdditionalPermissionsSection />
        <FormCResearchAreaSection />
        <FormCCruiseGoalSection />
      </form>
    </FormCProvider>
  );
}
