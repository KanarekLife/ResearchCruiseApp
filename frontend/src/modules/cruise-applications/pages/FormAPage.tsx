import { useForm } from '@tanstack/react-form';
import { Suspense } from 'react';

import { AppLayout } from '@/core/components/AppLayout';
import { AppLoader } from '@/core/components/AppLoader';
import { FormAContractsSection } from '@/cruise-applications/components/formA/FormAContractsSection';
import { FormACruiseGoalSection } from '@/cruise-applications/components/formA/FormACruiseGoalSection';
import { FormACruiseLengthSection } from '@/cruise-applications/components/formA/FormACruiseLengthSection';
import { FormACruiseManagerInfoSection } from '@/cruise-applications/components/formA/FormACruiseManagerInfoSection';
import { FormAMembersSection } from '@/cruise-applications/components/formA/FormAMembersSection';
import { FormAPermissionsSection } from '@/cruise-applications/components/formA/FormAPermissionsSection';
import { FormAResearchAreaSection } from '@/cruise-applications/components/formA/FormAResearchAreaSection';
import { FormAResearchTasksSection } from '@/cruise-applications/components/formA/FormAResearchTasksSection';
import { useFormAInitValues } from '@/cruise-applications/hooks/useFormAInitValues';
import { emptyFormADto, FormADto } from '@/cruise-applications/models/FormADto';

export function FormAPage() {
  const initialStateQuery = useFormAInitValues();
  const form = useForm<FormADto>({
    defaultValues: emptyFormADto,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    form.handleSubmit();
  }

  return (
    <AppLayout title="Formularz A" variant="defaultWithoutCentering">
      <Suspense fallback={<AppLoader />}>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <FormACruiseManagerInfoSection form={form} initValues={initialStateQuery} />
          <FormACruiseLengthSection form={form} initValues={initialStateQuery} />
          <FormAPermissionsSection form={form} initValues={initialStateQuery} />
          <FormAResearchAreaSection form={form} initValues={initialStateQuery} />
          <FormACruiseGoalSection form={form} initValues={initialStateQuery} />
          <FormAResearchTasksSection form={form} initValues={initialStateQuery} />
          <FormAContractsSection form={form} initValues={initialStateQuery} />
          <FormAMembersSection form={form} initValues={initialStateQuery} />
        </form>
      </Suspense>
    </AppLayout>
  );
}
