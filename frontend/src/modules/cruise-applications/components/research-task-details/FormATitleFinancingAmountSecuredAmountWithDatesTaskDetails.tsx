import { ReactFormExtendedApi } from '@tanstack/react-form';
import { Row } from '@tanstack/react-table';

import { AppInput } from '@/core/components/inputs/AppInput';
import { AppNumberInput } from '@/core/components/inputs/AppNumberInput';
import { AppMonthPickerInput } from '@/core/components/inputs/dates/AppMonthPickerInput';
import { mapValidationErrors } from '@/core/lib/utils';
import { FormADto, FormAResearchTask } from '@/cruise-applications/lib/types';

type Props = {
  form: ReactFormExtendedApi<FormADto, undefined>;
  row: Row<FormAResearchTask>;
};
export function FormATitleFinancingAmountSecuredAmountWithDatesTaskDetails({ form, row }: Props) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <form.Field
          name={`researchTasks[${row.index}].title`}
          children={(field) => (
            <AppInput
              name={field.name}
              label="Tytuł"
              value={field.state.value!}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={mapValidationErrors(field.state.meta.errors)}
              placeholder="Tytuł"
              required
            />
          )}
        />

        <form.Field
          name={`researchTasks[${row.index}].financingAmount`}
          children={(field) => (
            <AppNumberInput
              name={field.name}
              label="Kwota finansowania [zł]"
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

        <form.Field
          name={`researchTasks[${row.index}].securedAmount`}
          children={(field) => (
            <AppNumberInput
              name={field.name}
              label="Kwota zabezpieczona [zł]"
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

        <form.Field
          name={`researchTasks[${row.index}].startDate`}
          children={(field) => (
            <AppMonthPickerInput
              name={field.name}
              label="Od"
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={mapValidationErrors(field.state.meta.errors)}
              required
            />
          )}
        />

        <form.Field
          name={`researchTasks[${row.index}].endDate`}
          children={(field) => (
            <AppMonthPickerInput
              name={field.name}
              label="Do"
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={mapValidationErrors(field.state.meta.errors)}
              required
            />
          )}
        />
      </div>
    </div>
  );
}
