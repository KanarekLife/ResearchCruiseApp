import { FieldApi } from '@tanstack/react-form';
import { ColumnDef } from '@tanstack/react-table';

import { AppAccordion } from '@/core/components/AppAccordion';
import { AppInput } from '@/core/components/inputs/AppInput';
import { AppInputErrorsList } from '@/core/components/inputs/parts/AppInputErrorsList';
import { AppTable } from '@/core/components/table/AppTable';
import { AppTableDeleteRowButton } from '@/core/components/table/AppTableDeleteRowButton';
import { getErrors } from '@/core/lib/utils';
import { useFormC } from '@/cruise-applications/contexts/FormCContext';
import { FormCDto } from '@/cruise-applications/models/FormCDto';
import { ResearchAreaDescriptionDto } from '@/cruise-applications/models/ResearchAreaDescriptionDto';
import { getResearchAreaName } from '@/cruise-applications/models/ResearchAreaDto';

import { CruiseApplicationDropdownElementSelectorButton } from '../common/CruiseApplicationDropdownElementSelectorButton';

export function FormCResearchAreaSection() {
  const { form, isReadonly, formAInitValues, hasFormBeenSubmitted } = useFormC();

  function getColumns(
    field: FieldApi<FormCDto, 'researchAreaDescriptions', undefined, undefined, ResearchAreaDescriptionDto[]>
  ): ColumnDef<ResearchAreaDescriptionDto>[] {
    return [
      {
        header: 'Lp.',
        cell: ({ row }) => `${row.index + 1}. `,
        size: 5,
      },
      {
        header: 'Rejon prowadzenia badań',
        cell: ({ row }) =>
          getResearchAreaName(formAInitValues.researchAreas, row.original.id) == null ? (
            <>
              <form.Field name={`researchAreaDescriptions[${row.index}].id`} children={() => null} />
              <form.Field
                name={`researchAreaDescriptions[${row.index}].alternativeName`}
                children={(field) => (
                  <AppInput
                    name={field.name}
                    value={field.state.value ?? ''}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    errors={getErrors(field.state.meta, hasFormBeenSubmitted)}
                    label="Nazwa rejonu"
                    placeholder="np. Trójkąt Bermudzki"
                    disabled={isReadonly}
                    required
                  />
                )}
              />
            </>
          ) : (
            <>
              <form.Field
                name={`researchAreaDescriptions[${row.index}].id`}
                children={() => getResearchAreaName(formAInitValues.researchAreas, row.original.id)}
              />
              <form.Field name={`researchAreaDescriptions[${row.index}].alternativeName`} children={() => null} />
            </>
          ),
        size: 30,
      },
      {
        header: 'Informacje dodatkowe',
        cell: ({ row }) => (
          <form.Field
            name={`researchAreaDescriptions[${row.index}].info`}
            children={(field) => (
              <AppInput
                name={field.name}
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                errors={getErrors(field.state.meta, hasFormBeenSubmitted)}
                label="Opis"
                placeholder="np. szczegóły dotyczące celu rejsu"
                disabled={isReadonly}
                required
              />
            )}
          />
        ),
      },
      {
        id: 'actions',
        cell: ({ row }) => (
          <div className="flex justify-end">
            <AppTableDeleteRowButton
              onClick={() => {
                field.removeValue(row.index);
                field.handleChange((prev) => prev);
                field.handleBlur();
              }}
              disabled={isReadonly}
            />
          </div>
        ),
        size: 5,
      },
    ];
  }

  return (
    <AppAccordion title="5. Rejony prowadzenia badań" expandedByDefault>
      <form.Field
        name="researchAreaDescriptions"
        mode="array"
        children={(field) => (
          <>
            <AppTable
              columns={getColumns(field)}
              data={field.state.value}
              buttons={() => [
                <CruiseApplicationDropdownElementSelectorButton
                  key="new"
                  options={formAInitValues.researchAreas.concat([{ id: '', name: 'Inne...' }]).map((area) => ({
                    value: area.name,
                    onClick: () => {
                      field.pushValue({
                        id: area.id,
                        alternativeName: null,
                        info: '',
                      });
                      field.handleChange((prev) => prev);
                      field.handleBlur();
                    },
                  }))}
                  variant="primary"
                  disabled={isReadonly}
                >
                  Dodaj rejon
                </CruiseApplicationDropdownElementSelectorButton>,
              ]}
              emptyTableMessage="Nie dodano żadnego rejonu."
              variant="form"
              disabled={isReadonly}
            />
            <AppInputErrorsList errors={getErrors(field.state.meta, hasFormBeenSubmitted)} />
          </>
        )}
      />
    </AppAccordion>
  );
}
