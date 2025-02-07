import { useForm } from '@tanstack/react-form';
import { Suspense } from 'react';

import { AppLayout } from '@/core/components/AppLayout';
import { AppLoader } from '@/core/components/AppLoader';
import { FormACruiseGoalSection } from '@/formA/components/sections/FormACruiseGoalSection';
import { FormACruiseLengthSection } from '@/formA/components/sections/FormACruiseLengthSection';
import { FormACruiseManagerInfoSection } from '@/formA/components/sections/FormACruiseManagerInfoSection';
import { FormAPermissionsSection } from '@/formA/components/sections/FormAPermissionsSection';
import { FormAResearchAreaSection } from '@/formA/components/sections/FormAResearchAreaSection';
import { FormAResearchTasksSection } from '@/formA/components/sections/FormAResearchTasksSection';
import { useFormAInitialStateQuery } from '@/formA/hooks/FormAApiHooks';
import { FormADto } from '@/formA/lib/types';

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
  });

  return (
    <AppLayout title="Formularz A" variant="defaultWithoutCentering">
      <Suspense fallback={<AppLoader />}>
        <form className="space-y-8">
          <FormACruiseManagerInfoSection form={form} initialStateQuery={initialStateQuery} />
          <FormACruiseLengthSection form={form} initialStateQuery={initialStateQuery} />
          <FormAPermissionsSection form={form} />
          <FormAResearchAreaSection form={form} initialStateQuery={initialStateQuery} />
          <FormACruiseGoalSection form={form} initialStateQuery={initialStateQuery} />
          <FormAResearchTasksSection form={form} initialStateQuery={initialStateQuery} />
        </form>
      </Suspense>
    </AppLayout>
  );
}
