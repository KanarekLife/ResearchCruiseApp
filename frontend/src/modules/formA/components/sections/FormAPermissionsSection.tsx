import { ReactFormExtendedApi } from '@tanstack/react-form';

import { AppAccordion } from '@/core/components/AppAccordion';
import { AppButton } from '@/core/components/AppButton';
import { AppInput } from '@/core/components/inputs/AppInput';
import { AppTable } from '@/core/components/table/AppTable';
import { mapValidationErrors } from '@/core/lib/utils';
import { FormADto } from '@/formA/lib/types';

type Props = {
  form: ReactFormExtendedApi<FormADto, undefined>;
};

export function FormAPermissionsSection({ form }: Props) {
  return (
    <AppAccordion title="3. Dodatkowe pozwolenia do planowanych podczas rejsu badań" expandedByDefault>
      <div>
        <form.Field
          name="permissions"
          mode="array"
          children={(field) => (
            <AppTable
              columns={[
                {
                  header: 'Lp.',
                  cell: ({ row }) => `${row.index + 1}. `,
                },
                {
                  accessorFn: (row) => row.description,
                  header: 'Treść pozwolenia',
                  enableColumnFilter: false,
                  enableSorting: false,
                  cell: ({ row }) => (
                    <form.Field
                      key={row.index}
                      name={`permissions[${row.index}].description`}
                      children={(field) => (
                        <AppInput
                          name={field.name}
                          value={field.state.value}
                          onChange={field.handleChange}
                          onBlur={field.handleBlur}
                          errors={mapValidationErrors(field.state.meta.errors)}
                          className="mx-4"
                        />
                      )}
                    />
                  ),
                },
                {
                  accessorFn: (row) => row.executive,
                  header: 'Organ wydający',
                  enableColumnFilter: false,
                  enableSorting: false,
                  cell: ({ row }) => (
                    <form.Field
                      key={row.index}
                      name={`permissions[${row.index}].executive`}
                      children={(field) => (
                        <AppInput
                          name={field.name}
                          value={field.state.value}
                          onChange={field.handleChange}
                          onBlur={field.handleBlur}
                          errors={mapValidationErrors(field.state.meta.errors)}
                          className="mx-4"
                        />
                      )}
                    />
                  ),
                },
                {
                  header: 'Akcje',
                  cell: (row) => (
                    <div className="flex justify-center items-center">
                      <AppButton onClick={() => field.removeValue(row.row.index)} variant="dangerOutline">
                        Usuń
                      </AppButton>
                    </div>
                  ),
                },
              ]}
              data={field.state.value}
              buttons={() => [
                <AppButton key="addPermission" onClick={() => field.pushValue({ description: '', executive: '' })}>
                  Dodaj pozwolenie
                </AppButton>,
              ]}
              childForEmpty={<div className="text-center bg-gray-100 py-3">Nie dodano żadnego pozwolenia</div>}
            />
          )}
        />
      </div>
    </AppAccordion>
  );
}
