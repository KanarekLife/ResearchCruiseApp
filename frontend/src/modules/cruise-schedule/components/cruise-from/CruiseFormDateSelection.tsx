import { AppAccordion } from '@/core/components/AppAccordion';
import { AppDatePickerInput } from '@/core/components/inputs/dates/AppDatePickerInput';
import { getErrors } from '@/core/lib/utils';
import { useCruiseForm } from '@/cruise-schedule/contexts/CruiseFormContext';

export function CruiseFormDateSelection() {
  const { form, isReadonly } = useCruiseForm();

  return (
    <AppAccordion title="2. Termin rejsu" expandedByDefault>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <form.Field
          name="startDate"
          children={(field) => (
            <AppDatePickerInput
              name={field.name}
              value={field.state.value}
              onChange={(value) => field.handleChange(value as string)}
              onBlur={field.handleBlur}
              errors={getErrors(field.state.meta)}
              label="Data rozpoczęcia rejsu"
              required
              placeholder="Wybierz datę rozpoczęcia rejsu"
              disabled={isReadonly}
            />
          )}
        />

        <form.Field
          name="endDate"
          children={(field) => (
            <AppDatePickerInput
              name={field.name}
              value={field.state.value}
              onChange={(value) => field.handleChange(value as string)}
              onBlur={field.handleBlur}
              errors={getErrors(field.state.meta)}
              label="Data zakończenia rejsu"
              required
              placeholder="Wybierz datę zakończenia rejsu"
              disabled={isReadonly}
            />
          )}
        />
      </div>
    </AppAccordion>
  );
}
