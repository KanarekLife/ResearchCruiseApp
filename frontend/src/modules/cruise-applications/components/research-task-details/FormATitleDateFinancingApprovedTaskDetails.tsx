import { ReactFormExtendedApi } from '@tanstack/react-form';
import { Row } from '@tanstack/react-table';

import { AppDropdownInput } from '@/core/components/inputs/AppDropdownInput';
import { AppInput } from '@/core/components/inputs/AppInput';
import { mapValidationErrors } from '@/core/lib/utils';
import { FormADto, FormAResearchTask } from '@/cruise-applications/lib/types';

type Props = {
  form: ReactFormExtendedApi<FormADto, undefined>;
  row: Row<FormAResearchTask>;
};
export function FormATitleDateFinancingApprovedTaskDetails({ form, row }: Props) {
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
          name={`researchTasks[${row.index}].date`}
          children={(field) => (
            <AppInput
              name={field.name}
              label="Data"
              value={field.state.value!}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={mapValidationErrors(field.state.meta.errors)}
              placeholder="Data"
              required
            />
          )}
        />

        <form.Field
          name={`researchTasks[${row.index}].financingApproved`}
          children={(field) => (
            <AppDropdownInput
              name={field.name}
              label="Zatwierdzone finansowanie"
              value={field.state.value!}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={mapValidationErrors(field.state.meta.errors)}
              placeholder="Zatwierdzone finansowanie"
              required
              allOptions={['true', 'false'].map((value) => ({
                inlineLabel: value === 'true' ? 'Tak' : 'Nie',
                value: value,
              }))}
              showEmptyOption={false}
            />
          )}
        />
      </div>
    </div>
  );
}
