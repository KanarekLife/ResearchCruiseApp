import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import { FormAActionsSection } from '@/cruise-applications/components/formA/FormAActionsSection';
import { FormAContractsSection } from '@/cruise-applications/components/formA/FormAContractsSection';
import { FormACruiseGoalSection } from '@/cruise-applications/components/formA/FormACruiseGoalSection';
import { FormACruiseLengthSection } from '@/cruise-applications/components/formA/FormACruiseLengthSection';
import { FormACruiseManagerInfoSection } from '@/cruise-applications/components/formA/FormACruiseManagerInfoSection';
import { FormAMembersSection } from '@/cruise-applications/components/formA/FormAMembersSection';
import { FormAPermissionsSection } from '@/cruise-applications/components/formA/FormAPermissionsSection';
import { FormAPrintTemplate } from '@/cruise-applications/components/formA/FormAPrintTemplate';
import { FormAPublicationsSection } from '@/cruise-applications/components/formA/FormAPublicationsSection';
import { FormAResearchAreaSection } from '@/cruise-applications/components/formA/FormAResearchAreaSection';
import { FormAResearchTasksSection } from '@/cruise-applications/components/formA/FormAResearchTasksSection';
import { FormASPUBTasksSection } from '@/cruise-applications/components/formA/FormASPUBTasksSection';
import { FormASupervisorInfoSection } from '@/cruise-applications/components/formA/FormASupervisorInfoSection';
import { FormAContextType, FormAProvider } from '@/cruise-applications/contexts/FormAContext';

export function FormA({ context, onSaveDraft }: { context: FormAContextType; onSaveDraft?: () => void }) {
  const componentRef = useRef(null);

  const reactToPrintContent = () => {
    return componentRef.current;
  };

  const handlePrint = useReactToPrint({});

  return (
    <>
      <FormAProvider value={context}>
        <FormACruiseManagerInfoSection />
        <FormACruiseLengthSection />
        <FormAPermissionsSection />
        <FormAResearchAreaSection />
        <FormACruiseGoalSection />
        <FormAResearchTasksSection />
        <FormAContractsSection />
        <FormAMembersSection />
        <FormAPublicationsSection />
        <FormASPUBTasksSection />
        <FormASupervisorInfoSection />
        <FormAActionsSection onSaveDraft={onSaveDraft} onPrint={() => handlePrint(reactToPrintContent)} />
      </FormAProvider>

      <FormAPrintTemplate initValues={context.initValues} values={context.form.state.values} ref={componentRef} />
    </>
  );
}
