import { ReactFormExtendedApi } from '@tanstack/react-form';
import { Row } from '@tanstack/react-table';

import { AppInput } from '@/core/components/inputs/AppInput';
import { mapValidationErrors } from '@/core/lib/utils';
import { FormADto, FormAResearchTask } from '@/cruise-applications/lib/types';

type Props = {
  form: ReactFormExtendedApi<FormADto, undefined>;
  row: Row<FormAResearchTask>;
};
export function FormADescriptionTaskDetails({ form, row }: Props) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <form.Field
          name={`researchTasks[${row.index}].description`}
          children={(field) => (
            <AppInput
              name={field.name}
              label="Opis"
              value={field.state.value!}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={mapValidationErrors(field.state.meta.errors)}
              placeholder="Opis"
              required
            />
          )}
        />
      </div>
    </div>
  );
}
