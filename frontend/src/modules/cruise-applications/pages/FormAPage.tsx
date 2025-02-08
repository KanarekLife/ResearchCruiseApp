import { useForm } from '@tanstack/react-form';
import { Suspense } from 'react';

import { AppButton } from '@/core/components/AppButton';
import { AppLayout } from '@/core/components/AppLayout';
import { AppLoader } from '@/core/components/AppLoader';
import { FormACruiseGoalSection } from '@/cruise-applications/components/sections/FormACruiseGoalSection';
import { FormACruiseLengthSection } from '@/cruise-applications/components/sections/FormACruiseLengthSection';
import { FormACruiseManagerInfoSection } from '@/cruise-applications/components/sections/FormACruiseManagerInfoSection';
import { FormAPermissionsSection } from '@/cruise-applications/components/sections/FormAPermissionsSection';
import { FormAResearchAreaSection } from '@/cruise-applications/components/sections/FormAResearchAreaSection';
import { FormAResearchTasksSection } from '@/cruise-applications/components/sections/FormAResearchTasksSection';
import { useFormAInitialStateQuery } from '@/cruise-applications/hooks/FormAApiHooks';
import { FormADto } from '@/cruise-applications/lib/types';

export function FormAPage() {
  const initialStateQuery = useFormAInitialStateQuery();
  const form = useForm<FormADto>({
    defaultValues: {
      cruiseManagerId: '',
      deputyManagerId: '',
      year: '',
      acceptablePeriod: [],
      optimalPeriod: [],
      cruiseHours: 0,
      periodNotes: '',
      shipUsage: 0,
      differentShipUsage: '',
      permissions: [],
      researchAreaId: '',
      researchAreaInfo: '',
      cruiseGoal: '',
      cruiseGoalDescription: '',
      researchTasks: [],
    },
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
          <FormACruiseManagerInfoSection form={form} initialStateQuery={initialStateQuery} />
          <FormACruiseLengthSection form={form} initialStateQuery={initialStateQuery} />
          <FormAPermissionsSection form={form} />
          <FormAResearchAreaSection form={form} initialStateQuery={initialStateQuery} />
          <FormACruiseGoalSection form={form} initialStateQuery={initialStateQuery} />
          <FormAResearchTasksSection form={form} initialStateQuery={initialStateQuery} />
          <AppButton type="submit" className="w-full">
            Submit
          </AppButton>
        </form>
      </Suspense>
    </AppLayout>
  );
}
