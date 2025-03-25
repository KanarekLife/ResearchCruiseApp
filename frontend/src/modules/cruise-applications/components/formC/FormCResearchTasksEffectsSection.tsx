import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';

import { AppAccordion } from '@/core/components/AppAccordion';
import { AppCheckbox } from '@/core/components/inputs/AppCheckbox';
import { AppTable } from '@/core/components/table/AppTable';
import { getErrors } from '@/core/lib/utils';
import { ReadOnlyResearchTaskDetails } from '@/cruise-applications/components/common/readonly-research-task-details/ReadOnlyResearchTaskDetails';
import { useFormC } from '@/cruise-applications/contexts/FormCContext';
import { getTaskName } from '@/cruise-applications/models/ResearchTaskDto';
import { ResearchTaskEffectDto } from '@/cruise-applications/models/ResearchTaskEffectDto';

export function FormCResearchTasksSection() {
  const { form, isReadonly, hasFormBeenSubmitted } = useFormC();
  const [readOnlyPointsCheckboxes, setReadOnlyPointsCheckboxes] = useState(
    new Array(form.state.values.researchTasksEffects.length)
      .fill(false)
      .map(
        (_, i) =>
          form.state.values.researchTasksEffects[i].done === 'false' ||
          form.state.values.researchTasksEffects[i].done === undefined
      )
  );

  const columns: ColumnDef<ResearchTaskEffectDto>[] = [
    {
      header: 'Lp.',
      cell: ({ row }) => `${row.index + 1}. `,
      size: 5,
    },
    {
      header: 'Zadanie',
      accessorFn: (row) => getTaskName(row.type) ?? 'Nieznany typ',
      size: 15,
    },
    {
      header: 'Szczegóły',
      cell: ({ row }) => <ReadOnlyResearchTaskDetails data={row.original} />,
      size: 45,
    },
    {
      header: 'Zrealizowane',
      cell: ({ row }) => {
        return (
          <div className="flex justify-center">
            <form.Field
              name={`researchTasksEffects[${row.index}].done`}
              validators={{
                onChange: ({ value, fieldApi }) => {
                  if (value === 'false') {
                    fieldApi.form.setFieldValue(`researchTasksEffects[${row.index}].managerConditionMet`, 'false');
                    fieldApi.form.setFieldValue(`researchTasksEffects[${row.index}].deputyConditionMet`, 'false');
                  }
                  setReadOnlyPointsCheckboxes((prev) => {
                    const newValues = [...prev];
                    newValues[row.index] = value === 'false';
                    return newValues;
                  });
                  return undefined;
                },
              }}
              children={(field) => (
                <AppCheckbox
                  size="md"
                  name={field.name}
                  checked={field.state.value === 'true'}
                  onChange={(value) => {
                    field.handleChange(value ? 'true' : 'false');
                  }}
                  onBlur={field.handleBlur}
                  errors={getErrors(field.state.meta, hasFormBeenSubmitted)}
                  disabled={isReadonly}
                />
              )}
            />
          </div>
        );
      },
      size: 5,
    },
    {
      header: 'Naliczanie punktów',
      cell: ({ row }) => {
        return (
          <div className="grid grid-cols-2 gap-3">
            <form.Field
              name={`researchTasksEffects[${row.index}].managerConditionMet`}
              children={(field) => (
                <AppCheckbox
                  size="md"
                  name={field.name}
                  checked={field.state.value === 'true'}
                  onChange={(value) => field.handleChange(value ? 'true' : 'false')}
                  onBlur={field.handleBlur}
                  errors={getErrors(field.state.meta, hasFormBeenSubmitted)}
                  label="Czy naliczyć punkty kierownikowi?"
                  disabled={isReadonly || readOnlyPointsCheckboxes[row.index]}
                />
              )}
            />
            <form.Field
              name={`researchTasksEffects[${row.index}].deputyConditionMet`}
              children={(field) => (
                <AppCheckbox
                  size="md"
                  name={field.name}
                  checked={field.state.value === 'true'}
                  onChange={(value) => field.handleChange(value ? 'true' : 'false')}
                  onBlur={field.handleBlur}
                  errors={getErrors(field.state.meta, hasFormBeenSubmitted)}
                  label="Czy naliczyć punkty zastępcy?"
                  disabled={isReadonly || readOnlyPointsCheckboxes[row.index]}
                />
              )}
            />
          </div>
        );
      },
      size: 30,
    },
  ];

  return (
    <AppAccordion title="7. Zadania przypisane do rejsu - efekty rejsu" expandedByDefault>
      <AppTable
        data={form.state.values.researchTasksEffects}
        columns={columns}
        buttons={() => []}
        emptyTableMessage="Nie dodano żadnego zadania."
        disabled={isReadonly}
      />
    </AppAccordion>
  );
}
