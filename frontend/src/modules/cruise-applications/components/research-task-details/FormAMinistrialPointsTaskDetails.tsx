import { ReactFormExtendedApi } from '@tanstack/react-form';
import { Row } from '@tanstack/react-table';

import { AppInput } from '@/core/components/inputs/AppInput';
import { AppNumberInput } from '@/core/components/inputs/AppNumberInput';
import { AppDatePickerInput } from '@/core/components/inputs/dates/AppDatePickerInput';
import { mapValidationErrors } from '@/core/lib/utils';
import { FormADto, FormAResearchTask } from '@/cruise-applications/lib/types';

type Props = {
  form: ReactFormExtendedApi<FormADto, undefined>;
  row: Row<FormAResearchTask>;
};
export function FormAMinisterialPointsTaskDetails({ form, row }: Props) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <form.Field
          name={`researchTasks[${row.index}].title`}
          children={(field) => (
            <AppInput
              name={field.name}
              label="Roboczy tytuł publikacji"
              value={field.state.value!}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={mapValidationErrors(field.state.meta.errors)}
              placeholder="Roboczy tytuł publikacji"
              required
            />
          )}
        />

        <form.Field
          name={`researchTasks[${row.index}].date`}
          children={(field) => (
            <AppDatePickerInput
              name={field.name}
              label="Przewidywany termin składania"
              value={field.state.value!}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={mapValidationErrors(field.state.meta.errors)}
              placeholder="Przewidywany termin składania"
              required
            />
          )}
        />

        <form.Field
          name={`researchTasks[${row.index}].magazine`}
          children={(field) => (
            <AppInput
              name={field.name}
              label="Czasopismo"
              value={field.state.value!}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={mapValidationErrors(field.state.meta.errors)}
              placeholder="Czasopismo"
              required
            />
          )}
        />

        <form.Field
          name={`researchTasks[${row.index}].MinisterialPoints`}
          children={(field) => (
            <AppNumberInput
              name={field.name}
              label="Przewidywane punkty ministerialne"
              value={parseInt(field.state.value!)}
              onChange={(evt) => {
                field.handleChange(evt.currentTarget.value);
              }}
              onBlur={field.handleBlur}
              errors={mapValidationErrors(field.state.meta.errors)}
              onIncrement={() => field.handleChange((parseInt(field.state.value!) + 1).toString())}
              onDecrement={() => field.handleChange((parseInt(field.state.value!) - 1).toString())}
              required
            />
          )}
        />
      </div>
    </div>
  );
}
