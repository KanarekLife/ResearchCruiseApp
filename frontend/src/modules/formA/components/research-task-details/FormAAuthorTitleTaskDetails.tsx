import { ReactFormExtendedApi } from '@tanstack/react-form';
import { Row } from '@tanstack/react-table';

import { AppInput } from '@/core/components/inputs/AppInput';
import { mapValidationErrors } from '@/core/lib/utils';
import { FormADto, FormAResearchTask } from '@/formA/lib/types';

type Props = {
  form: ReactFormExtendedApi<FormADto, undefined>;
  row: Row<FormAResearchTask>;
};
export function FormAAuthorTitleTaskDetails({ form, row }: Props) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <form.Field
          name={`researchTasks[${row.index}].author`}
          children={(field) => (
            <AppInput
              name={field.name}
              label="Autor"
              value={field.state.value!}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={mapValidationErrors(field.state.meta.errors)}
              placeholder="Autor"
              required
            />
          )}
        />

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
      </div>
    </div>
  );
}
