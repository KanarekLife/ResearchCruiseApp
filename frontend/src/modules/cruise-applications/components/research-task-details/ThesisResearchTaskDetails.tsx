import { ReactFormExtendedApi } from '@tanstack/react-form';
import { Row } from '@tanstack/react-table';

import { AppInput } from '@/core/components/inputs/AppInput';
import { mapValidationErrors } from '@/core/lib/utils';
import { FormADto } from '@/cruise-applications/models/FormADto';
import { ThesisResearchTaskDto } from '@/cruise-applications/models/ResearchTaskDto';

type Props = {
  form: ReactFormExtendedApi<FormADto, undefined>;
  row: Row<ThesisResearchTaskDto>;
};
export function ThesisResearchTaskDetails({ form, row }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <form.Field
        name={`researchTasks[${row.index}].author`}
        children={(field) => (
          <AppInput
            name={field.name}
            value={field.state.value as string}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            errors={mapValidationErrors(field.state.meta.errors)}
            label="Autor"
            placeholder="Wprowadź autora"
            required
          />
        )}
      />

      <form.Field
        name={`researchTasks[${row.index}].title`}
        children={(field) => (
          <AppInput
            name={field.name}
            value={field.state.value as string}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            errors={mapValidationErrors(field.state.meta.errors)}
            label="Tytuł"
            placeholder="Wprowadź tytuł"
            required
          />
        )}
      />
    </div>
  );
}
