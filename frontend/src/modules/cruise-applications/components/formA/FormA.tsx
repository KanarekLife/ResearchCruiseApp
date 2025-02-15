import { FormAContractsSection } from '@/cruise-applications/components/formA/FormAContractsSection';
import { FormACruiseGoalSection } from '@/cruise-applications/components/formA/FormACruiseGoalSection';
import { FormACruiseLengthSection } from '@/cruise-applications/components/formA/FormACruiseLengthSection';
import { FormACruiseManagerInfoSection } from '@/cruise-applications/components/formA/FormACruiseManagerInfoSection';
import { FormAMembersSection } from '@/cruise-applications/components/formA/FormAMembersSection';
import { FormAPermissionsSection } from '@/cruise-applications/components/formA/FormAPermissionsSection';
import { FormAPublicationsSection } from '@/cruise-applications/components/formA/FormAPublicationsSection';
import { FormAResearchAreaSection } from '@/cruise-applications/components/formA/FormAResearchAreaSection';
import { FormAResearchTasksSection } from '@/cruise-applications/components/formA/FormAResearchTasksSection';
import { FormAProps } from '@/cruise-applications/components/formA/FormASectionProps';
import { FormASPUBTasksSection } from '@/cruise-applications/components/formA/FormASPUBTasksSection';
import { FormASupervisorInfoSection } from '@/cruise-applications/components/formA/FormASupervisorInfoSection';

export function FormA({ initValues, form, readonly }: FormAProps) {
  return (
    <>
      <FormACruiseManagerInfoSection form={form} initValues={initValues} readonly={readonly} />
      <FormACruiseLengthSection form={form} initValues={initValues} readonly={readonly} />
      <FormAPermissionsSection form={form} initValues={initValues} readonly={readonly} />
      <FormAResearchAreaSection form={form} initValues={initValues} readonly={readonly} />
      <FormACruiseGoalSection form={form} initValues={initValues} readonly={readonly} />
      <FormAResearchTasksSection form={form} initValues={initValues} readonly={readonly} />
      <FormAContractsSection form={form} initValues={initValues} readonly={readonly} />
      <FormAMembersSection form={form} initValues={initValues} readonly={readonly} />
      <FormAPublicationsSection form={form} initValues={initValues} readonly={readonly} />
      <FormASPUBTasksSection form={form} initValues={initValues} readonly={readonly} />
      <FormASupervisorInfoSection form={form} initValues={initValues} readonly={readonly} />
    </>
  );
}
