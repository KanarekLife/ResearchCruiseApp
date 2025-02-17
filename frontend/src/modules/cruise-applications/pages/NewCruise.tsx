import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import FloppyFillIcon from 'bootstrap-icons/icons/floppy-fill.svg?react';
import { Suspense, useState } from 'react';

import { AppButton } from '@/core/components/AppButton';
import { AppLayout } from '@/core/components/AppLayout';
import { AppLoader } from '@/core/components/AppLoader';
import { AppModal } from '@/core/components/AppModal';
import { AppInput } from '@/core/components/inputs/AppInput';
import { getErrors } from '@/core/lib/utils';
import { FormA } from '@/cruise-applications/components/formA/FormA';
import { getFormAValidationSchema } from '@/cruise-applications/helpers/FormAValidationSchema';
import { useFormAInitValuesQuery, useSaveFormADraftMutation } from '@/cruise-applications/hooks/FormAApiHooks';
import { emptyFormADto, FormADto } from '@/cruise-applications/models/FormADto';

export function NewCruisePage() {
  const navigate = useNavigate();
  const [hasFormBeenSubmitted, setHasFormBeenSubmitted] = useState(false);
  const [isSaveDraftModalOpen, setIsSaveDraftModalOpen] = useState(false);
  const initialStateQuery = useFormAInitValuesQuery();
  const saveDraftMutation = useSaveFormADraftMutation();
  const form = useForm<FormADto>({
    defaultValues: emptyFormADto,
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

  function handleSaveDraft() {
    saveDraftMutation.mutate(
      { form: form.state.values },
      {
        onSuccess: () => navigate({ to: '/' }),
        onError: (err) => console.error(err),
        onSettled: () => setIsSaveDraftModalOpen(false),
      }
    );
  }

  return (
    <>
      <div>
        <AppLayout title="Formularz A" variant="defaultWithoutCentering">
          <Suspense fallback={<AppLoader />}>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <FormA
                context={{ form, initValues: initialStateQuery.data, isReadonly: false, hasFormBeenSubmitted }}
                onSaveDraft={() => setIsSaveDraftModalOpen(true)}
              />
            </form>
          </Suspense>
        </AppLayout>
      </div>
      <AppModal title="Zapisz Formularz A" isOpen={isSaveDraftModalOpen} onClose={() => setIsSaveDraftModalOpen(false)}>
        <div className="space-y-4">
          <form.Field
            name="note"
            children={(field) => (
              <AppInput
                name={field.name}
                value={field.state.value ?? ''}
                onBlur={field.handleBlur}
                onChange={field.handleChange}
                label="Notatka aktualnej wersji roboczej"
                placeholder="Wpisz notatkę dot. aktualnej wersji roboczej"
                errors={getErrors(field.state.meta)}
                autoFocus
                required
              />
            )}
          />

          <div className="flex justify-center gap-4">
            <AppButton className="gap-4" disabled={saveDraftMutation.isPending} onClick={handleSaveDraft}>
              <FloppyFillIcon className="h-4 w-4" />
              Zapisz
            </AppButton>
          </div>
        </div>
      </AppModal>
    </>
  );
}
