import { AppAccordion } from '@/core/components/AppAccordion';
import { AppAlert } from '@/core/components/AppAlert';
import { AppInput } from '@/core/components/inputs/AppInput';
import { mapValidationErrors } from '@/core/lib/utils';
import { FormAProps } from '@/cruise-applications/components/formA/FormASectionProps';

export function FormASupervisorInfoSection({ form, readonly }: FormAProps) {
  return (
    <AppAccordion title="11. Dane kontaktowe przełożonego" expandedByDefault>
      <div className="max-w-180 mx-auto space-y-4">
        <AppAlert variant="warning">
          <span className="text-sm text-center">
            Użytkownik odpowiada za podanie prawidłowego adresu e-mail przełożonego, a w przypadku fałszywych danych
            zgłoszenie może zostać odrzucone.
          </span>
        </AppAlert>
        <form.Field
          name="supervisorEmail"
          children={(field) => (
            <AppInput
              name={field.name}
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={mapValidationErrors(field.state.meta.errors)}
              label="Adres e-mail przełożonego"
              placeholder="Wprowadź adres e-mail przełożonego"
              type="email"
              required
              disabled={readonly}
            />
          )}
        />
      </div>
    </AppAccordion>
  );
}
