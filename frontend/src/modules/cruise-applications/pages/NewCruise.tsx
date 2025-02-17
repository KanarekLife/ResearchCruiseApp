import { useForm } from '@tanstack/react-form';
import { Suspense, useState } from 'react';

import { AppLayout } from '@/core/components/AppLayout';
import { AppLoader } from '@/core/components/AppLoader';
import { FormA } from '@/cruise-applications/components/formA/FormA';
import { getFormAValidationSchema } from '@/cruise-applications/helpers/FormAValidationSchema';
import { useFormAInitValues } from '@/cruise-applications/hooks/FormAApiHooks';
import { emptyFormADto, FormADto } from '@/cruise-applications/models/FormADto';

export function NewCruisePage() {
  const [hasFormBeenSubmitted, setHasFormBeenSubmitted] = useState(false);
  const initialStateQuery = useFormAInitValues();
  const validator = getFormAValidationSchema(initialStateQuery.data);
  const form = useForm<FormADto>({
    defaultValues: emptyFormADto,
    validators: {
      onChange: validator,
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
          <FormA context={{ form, initValues: initialStateQuery.data, isReadonly: false, hasFormBeenSubmitted }} />
        </form>
      </Suspense>
    </AppLayout>
  );
}
