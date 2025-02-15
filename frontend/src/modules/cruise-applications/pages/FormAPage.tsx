import { useForm } from '@tanstack/react-form';
import { getRouteApi } from '@tanstack/react-router';
import { Suspense, useState } from 'react';

import { AppLayout } from '@/core/components/AppLayout';
import { AppLoader } from '@/core/components/AppLoader';
import { FormA } from '@/cruise-applications/components/formA/FormA';
import { getFormAValidationSchema } from '@/cruise-applications/helpers/FormAValidationSchema';
import { useFormA, useFormAInitValues } from '@/cruise-applications/hooks/FormAApiHooks';
import { emptyFormADto, FormADto } from '@/cruise-applications/models/FormADto';

export function FormAPage() {
  const [editMode] = useState(false);
  const { cruiseId } = getRouteApi('/cruises/$cruiseId/formA').useParams();
  const initialStateQuery = useFormAInitValues();
  const formA = useFormA(cruiseId);

  const form = useForm<FormADto>({
    defaultValues: formA.data ?? emptyFormADto,
    validators: {
      onChange: getFormAValidationSchema(initialStateQuery.data),
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
          <FormA form={form} initValues={initialStateQuery} readonly={!editMode} />
        </form>
      </Suspense>
    </AppLayout>
  );
}
