import { FieldApi } from '@tanstack/react-form';
import { ColumnDef } from '@tanstack/react-table';

import { AppAccordion } from '@/core/components/AppAccordion';
import { AppButton } from '@/core/components/AppButton';
import { AppInput } from '@/core/components/inputs/AppInput';
import { AppTable } from '@/core/components/table/AppTable';
import { AppTableDeleteRowButton } from '@/core/components/table/AppTableDeleteRowButton';
import { mapValidationErrors } from '@/core/lib/utils';
import { FormAProps } from '@/cruise-applications/components/formA/FormASectionProps';
import { FormADto } from '@/cruise-applications/models/FormADto';
import { PermissionDto } from '@/cruise-applications/models/PermissionDto';

export function FormAPermissionsSection({ form, readonly }: FormAProps) {
  const newPermission: PermissionDto = { description: '', executive: '', scan: undefined };

  function getColumns(
    field: FieldApi<FormADto, 'permissions', undefined, undefined, PermissionDto[]>
  ): ColumnDef<PermissionDto>[] {
    return [
      {
        header: 'Lp.',
        cell: ({ row }) => `${row.index + 1}. `,
        size: 10,
      },
      {
        header: 'Treść pozwolenia',
        accessorFn: (row) => row.description,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => (
          <form.Field
            name={`permissions[${row.index}].description`}
            children={(field) => (
              <AppInput
                name={field.name}
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                errors={mapValidationErrors(field.state.meta.errors)}
                className="mx-4"
                disabled={readonly}
              />
            )}
          />
        ),
      },
      {
        header: 'Organ wydający',
        accessorFn: (row) => row.executive,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => (
          <form.Field
            name={`permissions[${row.index}].executive`}
            children={(field) => (
              <AppInput
                name={field.name}
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                errors={mapValidationErrors(field.state.meta.errors)}
                className="mx-4"
                disabled={readonly}
              />
            )}
          />
        ),
      },
      {
        id: 'actions',
        cell: ({ row }) => (
          <div className="flex justify-end">
            <AppTableDeleteRowButton onClick={() => field.removeValue(row.index)} disabled={readonly} />
          </div>
        ),
        size: 10,
      },
    ];
  }

  return (
    <AppAccordion title="3. Dodatkowe pozwolenia do planowanych podczas rejsu badań" expandedByDefault>
      <div>
        <form.Field
          name="permissions"
          mode="array"
          children={(field) => (
            <AppTable
              columns={getColumns(field)}
              data={field.state.value}
              buttons={() => [
                <AppButton key="permissions.add-btn" onClick={() => field.pushValue(newPermission)} disabled={readonly}>
                  Dodaj pozwolenie
                </AppButton>,
              ]}
              emptyTableMessage="Nie dodano żadnego pozwolenia."
            />
          )}
        />
      </div>
    </AppAccordion>
  );
}
