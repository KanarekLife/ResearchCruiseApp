import { useForm } from '@tanstack/react-form';
import { getRouteApi, Navigate } from '@tanstack/react-router';
import CheckLgIcon from 'bootstrap-icons/icons/check-lg.svg?react';
import XLgIcon from 'bootstrap-icons/icons/x-lg.svg?react';
import React from 'react';
import { z } from 'zod';

import { AppButton } from '@/core/components/AppButton';
import { AppLayout } from '@/core/components/AppLayout';
import { AppLink } from '@/core/components/AppLink';
import { AppFloatingLabelInput } from '@/core/components/inputs/AppFloatingLabelInput';
import { getErrors } from '@/core/lib/utils';
import { useResetPasswordMutation } from '@/user/hooks/UserApiHooks';
import { Result } from '@/user/models/Results';

const validationSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Hasło powinno mieć co najmniej 8 znaków')
      .regex(
        /\b(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}\b/,
        'Hasło powinno zawierać jedną dużą literę, jedną małą literę oraz cyfrę'
      ),
    passwordConfirm: z.string(),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      return ctx.addIssue({
        code: 'custom',
        message: 'Hasła nie są takie same',
        path: ['passwordConfirm'],
      });
    }
  });

const routeApi = getRouteApi('/resetpassword');

export function ResetPasswordPage() {
  const { emailBase64, resetCode } = routeApi.useSearch();
  const [result, setResult] = React.useState<Result | undefined>(undefined);
  const [hasFormBeenSubmitted, setHasFormBeenSubmitted] = React.useState(false);
  const { mutateAsync } = useResetPasswordMutation({ setResult });
  const form = useForm({
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
    validators: {
      onChange: validationSchema,
    },
    onSubmit: async ({ value }) => {
      setHasFormBeenSubmitted(true);

      await form.validate('change');
      if (!form.state.isValid) {
        return;
      }

      if (!emailBase64 || !resetCode) {
        throw new Error('Not all fields are filled despite validation');
      }

      await mutateAsync({
        emailBase64,
        resetCode,
        password: value.password,
        passwordConfirm: value.passwordConfirm,
      });
    },
  });

  if (!emailBase64 || !resetCode) {
    return <Navigate to="/" />;
  }

  if (result) {
    const title = result === 'success' ? 'Hasło zostało zmienione' : 'Błąd podczas resetowania hasła';
    return (
      <AppLayout title={title} variant="narrow">
        <div className="flex flex-col items-center">
          <div className="h-60">
            {result === 'success' ? <CheckLgIcon className="text-success" /> : <XLgIcon className="text-danger" />}
          </div>
          <div className="text-gray-600 text-center">
            {result === 'success' && <>Hasło zostało pomyślnie zmienione. Możesz teraz się zalogować</>}
            {result === 'error' && (
              <>
                Wystąpił błąd podczas resetowania hasła. Proszę skontaktować się z pomocą{' '}
                <AppLink href="mailto:rejsy.help@ug.edu.pl">rejsy.help@ug.edu.pl</AppLink>
              </>
            )}
          </div>
        </div>
        <AppButton type="link" href="/login" className="w-full mt-6">
          Przejdź do logowania
        </AppButton>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Resetowanie hasła" variant="narrow">
      <form
        className="px-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="password"
          children={(field) => (
            <AppFloatingLabelInput
              name={field.name}
              value={field.state.value}
              type="password"
              onBlur={field.handleBlur}
              onChange={field.handleChange}
              errors={getErrors(field.state.meta, hasFormBeenSubmitted)}
              label="Hasło"
              required
            />
          )}
        />

        <form.Field
          name="passwordConfirm"
          children={(field) => (
            <AppFloatingLabelInput
              name={field.name}
              value={field.state.value}
              type="password"
              onBlur={field.handleBlur}
              onChange={field.handleChange}
              errors={getErrors(field.state.meta, hasFormBeenSubmitted)}
              label="Potwierdź hasło"
              required
            />
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <AppButton type="submit" className="w-full mt-6" disabled={!canSubmit || isSubmitting}>
              Zmień hasło
            </AppButton>
          )}
        />
      </form>
    </AppLayout>
  );
}
