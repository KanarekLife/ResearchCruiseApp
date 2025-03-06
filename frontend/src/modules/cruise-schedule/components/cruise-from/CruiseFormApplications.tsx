import { FieldApi } from '@tanstack/react-form';
import { ColumnDef } from '@tanstack/react-table';

import { AppAccordion } from '@/core/components/AppAccordion';
import { AppAvatar } from '@/core/components/AppAvatar';
import { AppButton } from '@/core/components/AppButton';
import { AppTable } from '@/core/components/table/AppTable';
import { CruiseApplicationDto } from '@/cruise-applications/models/CruiseApplicationDto';
import { useCruiseForm } from '@/cruise-schedule/contexts/CruiseFormContext';
import { CruiseFormDto } from '@/cruise-schedule/models/CruiseFormDto';

export function CruiseFormApplications() {
  const { form, cruiseApplications, isReadonly } = useCruiseForm();

  function getColumns(
    field: FieldApi<CruiseFormDto, 'cruiseApplicationsIds', undefined, undefined, string[]>,
    attached: boolean
  ): ColumnDef<CruiseApplicationDto>[] {
    function addApplication(application: CruiseApplicationDto) {
      field.pushValue(application.id);
      field.handleChange((prev) => prev);
      field.handleBlur();
    }

    function removeApplication(rowId: number) {
      field.removeValue(rowId);
      field.handleChange((prev) => prev);
      field.handleBlur();
    }

    return [
      {
        header: 'Numer',
        accessorFn: (row) => row.number,
        enableColumnFilter: !attached,
      },
      {
        header: 'Rok rejsu',
        accessorFn: (row) => row.year,
        enableColumnFilter: !attached,
      },
      {
        header: 'Kierownik',
        accessorFn: (row) => `${row.cruiseManagerFirstName} ${row.cruiseManagerLastName}`,
        enableColumnFilter: !attached,
        cell: (cell) => (
          <div className="flex items-center justify-center gap-2">
            <AppAvatar variant="small" fullName={cell.getValue() as string} /> <div>{cell.getValue() as string}</div>
          </div>
        ),
      },
      {
        header: 'Punkty',
        accessorFn: (row) => row.points,
      },
      {
        id: 'actions',
        enableHiding: true,
        cell: ({ row }) =>
          isReadonly ||
          (attached ? (
            <AppButton variant="dangerOutline" size="sm" onClick={() => removeApplication(row.index)}>
              Usuń
            </AppButton>
          ) : (
            <AppButton variant="successOutline" size="sm" onClick={() => addApplication(row.original)}>
              Dodaj
            </AppButton>
          )),
      },
    ];
  }

  return (
    <AppAccordion title="4. Zgłoszenia przypisane do rejsu" expandedByDefault>
      <form.Field
        name="cruiseApplicationsIds"
        mode="array"
        children={(field) => (
          <div className="my-4">
            <AppTable
              columns={getColumns(field, true)}
              data={cruiseApplications.filter((application) => field.state.value.includes(application.id))}
              buttons={() => []}
              variant="form"
            />

            <AppTable
              columns={getColumns(field, false)}
              data={cruiseApplications.filter((application) => !field.state.value.includes(application.id))}
              buttons={() => []}
              variant="form"
            />
          </div>
        )}
      />
    </AppAccordion>
  );
}
