import { useForm } from '@tanstack/react-form';
import { Suspense, useEffect } from 'react';

import { AppLayout } from '@/core/components/AppLayout';
import { AppLoader } from '@/core/components/AppLoader';
import { FormA } from '@/cruise-applications/components/formA/FormA';
import { getFormAValidationSchema } from '@/cruise-applications/helpers/FormAValidationSchema';
import { useFormAInitValues } from '@/cruise-applications/hooks/FormAApiHooks';
import { emptyFormADto, FormADto } from '@/cruise-applications/models/FormADto';

export function NewCruisePage() {
  const initialStateQuery = useFormAInitValues();
  const validator = getFormAValidationSchema(initialStateQuery.data);
  const form = useForm<FormADto>({
    defaultValues: emptyFormADto,
    validators: {
      onBlur: validator,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    form.validateAllFields('blur');
  }, [form]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    form.handleSubmit();
  }

  return (
    <AppLayout title="Formularz A" variant="defaultWithoutCentering">
      <Suspense fallback={<AppLoader />}>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <FormA form={form} initValues={initialStateQuery} />
        </form>
      </Suspense>
    </AppLayout>
  );
}
