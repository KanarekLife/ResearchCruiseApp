import { useForm } from '@tanstack/react-form';
import { getRouteApi } from '@tanstack/react-router';
import { Suspense, useState } from 'react';

import { AppLayout } from '@/core/components/AppLayout';
import { AppLoader } from '@/core/components/AppLoader';
import { FormA } from '@/cruise-applications/components/formA/FormA';
import { getFormAValidationSchema } from '@/cruise-applications/helpers/FormAValidationSchema';
import { useFormAQuery, useFormAInitValuesQuery } from '@/cruise-applications/hooks/FormAApiHooks';
import { emptyFormADto, FormADto } from '@/cruise-applications/models/FormADto';

export function FormAPage() {
  const [editMode] = useState(false);
  const [hasFormBeenSubmitted, setHasFormBeenSubmitted] = useState(false);
  const { cruiseId } = getRouteApi('/cruises/$cruiseId/formA').useParams();
  const initialStateQuery = useFormAInitValuesQuery();
  const formA = useFormAQuery(cruiseId);

  const form = useForm<FormADto>({
    defaultValues: formA.data ?? emptyFormADto,
    validators: {
      onChange: getFormAValidationSchema(initialStateQuery.data),
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    evt.stopPropagation();
    setHasFormBeenSubmitted(true);
    form.handleSubmit();
  }

  return (
    <AppLayout title="Formularz A" variant="defaultWithoutCentering">
      <Suspense fallback={<AppLoader />}>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <FormA context={{ form, initValues: initialStateQuery.data, isReadonly: !editMode, hasFormBeenSubmitted }} />
        </form>
      </Suspense>
    </AppLayout>
  );
}
