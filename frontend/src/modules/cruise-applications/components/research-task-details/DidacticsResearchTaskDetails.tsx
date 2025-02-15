import { ReactFormExtendedApi } from '@tanstack/react-form';
import { Row } from '@tanstack/react-table';

import { AppInput } from '@/core/components/inputs/AppInput';
import { mapValidationErrors } from '@/core/lib/utils';
import { FormADto } from '@/cruise-applications/models/FormADto';
import { DidacticsResearchTaskDto } from '@/cruise-applications/models/ResearchTaskDto';

type Props = {
  form: ReactFormExtendedApi<FormADto, undefined>;
  row: Row<DidacticsResearchTaskDto>;
  disabled?: boolean;
};
export function DidacticsResearchTaskDetails({ form, row, disabled }: Props) {
  return (
    <div>
      <form.Field
        name={`researchTasks[${row.index}].description`}
        children={(field) => (
          <AppInput
            name={field.name}
            value={field.state.value as string}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            errors={mapValidationErrors(field.state.meta.errors)}
            label="Opis zajęcia dydaktycznego"
            placeholder="Wprowadź opis zajęcia dydaktycznego"
            required
            disabled={disabled}
          />
        )}
      />
    </div>
  );
}
