import { ReactFormExtendedApi } from '@tanstack/react-form';
import { Row } from '@tanstack/react-table';

import { AppInput } from '@/core/components/inputs/AppInput';
import { AppMonthPickerInput } from '@/core/components/inputs/dates/AppMonthPickerInput';
import { mapValidationErrors } from '@/core/lib/utils';
import { FormADto } from '@/cruise-applications/models/FormADto';
import { ProjectResearchTaskDto } from '@/cruise-applications/models/ResearchTaskDto';

type Props = {
  form: ReactFormExtendedApi<FormADto, undefined>;
  row: Row<ProjectResearchTaskDto>;
  disabled?: boolean;
};
export function ProjectResearchTaskDetails({ form, row, disabled }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
            containerClassName="lg:col-span-2"
            required
            disabled={disabled}
          />
        )}
      />

      <form.Field
        name={`researchTasks[${row.index}].startDate`}
        children={(field) => (
          <AppMonthPickerInput
            name={field.name}
            value={field.state.value as string}
            onBlur={field.handleBlur}
            onChange={field.handleChange}
            errors={mapValidationErrors(field.state.meta.errors)}
            label="Data rozpoczęcia"
            required
            disabled={disabled}
          />
        )}
      />

      <form.Field
        name={`researchTasks[${row.index}].endDate`}
        children={(field) => (
          <AppMonthPickerInput
            name={field.name}
            value={field.state.value as string}
            onBlur={field.handleBlur}
            onChange={field.handleChange}
            errors={mapValidationErrors(field.state.meta.errors)}
            label="Data zakończenia"
            required
            disabled={disabled}
          />
        )}
      />

      <form.Field name={`researchTasks[${row.index}].financingAmount`} children={() => <span>TODO</span>} />

      <form.Field name={`researchTasks[${row.index}].securedAmount`} children={() => <span>TODO</span>} />
    </div>
  );
}
