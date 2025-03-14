import { FieldApi } from '@tanstack/react-form';
import { ColumnDef } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';

import { AppAccordion } from '@/core/components/AppAccordion';
import { AppAvatar } from '@/core/components/AppAvatar';
import { AppButton } from '@/core/components/AppButton';
import { AppInputErrorsList } from '@/core/components/inputs/parts/AppInputErrorsList';
import { AppTable } from '@/core/components/table/AppTable';
import { getErrors } from '@/core/lib/utils';
import { CruiseApplicationDto } from '@/cruise-applications/models/CruiseApplicationDto';
import { useCruiseForm } from '@/cruise-schedule/contexts/CruiseFormContext';
import { CruiseFormDto } from '@/cruise-schedule/models/CruiseFormDto';

export function CruiseFormApplicationsSection() {
  const { form, cruiseApplications, isReadonly, hasFormBeenSubmitted } = useCruiseForm();

  const [expanded, setExpanded] = React.useState(false);

  function handleAddApplication(
    field: FieldApi<CruiseFormDto, 'cruiseApplicationsIds', undefined, undefined, string[]>,
    id: string
  ) {
    field.pushValue(id);
    field.handleChange((prev) => prev);
    field.handleBlur();
    field.form.validateAllFields('blur');
    field.form.validateAllFields('change');
  }

  function handleRemoveApplication(
    field: FieldApi<CruiseFormDto, 'cruiseApplicationsIds', undefined, undefined, string[]>,
    id: string
  ) {
    const index = field.state.value.indexOf(id);
    field.removeValue(index);
    field.handleChange((prev) => prev);
    field.handleBlur();
    field.form.validateAllFields('blur');
    field.form.validateAllFields('change');
  }

  function getColumns(
    field: FieldApi<CruiseFormDto, 'cruiseApplicationsIds', undefined, undefined, string[]>,
    attached: boolean
  ): ColumnDef<CruiseApplicationDto>[] {
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
        enableColumnFilter: false,
      },
      ...(!isReadonly
        ? ([
            {
              id: 'actions',
              cell: ({ row }) => (
                <AppButton
                  variant={attached ? 'dangerOutline' : 'successOutline'}
                  size="sm"
                  onClick={() => {
                    if (attached) {
                      handleRemoveApplication(field, row.original.id);
                    } else {
                      handleAddApplication(field, row.original.id);
                    }
                  }}
                >
                  {attached ? 'Usuń' : 'Dodaj'}
                </AppButton>
              ),
            },
          ] as ColumnDef<CruiseApplicationDto>[])
        : []),
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
              buttons={() =>
                isReadonly
                  ? []
                  : [
                      <AppButton onClick={() => setExpanded((prev) => !prev)} key="addNewApplication">
                        {expanded ? 'Zakończ dołączanie zgłoszeń' : 'Dodaj nowe zgłoszenie'}
                      </AppButton>,
                    ]
              }
              emptyTableMessage="Brak załączonych zgłoszeń"
            />

            <AppInputErrorsList errors={getErrors(field.state.meta, hasFormBeenSubmitted)} />

            <AnimatePresence>
              {expanded && !isReadonly && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ ease: 'easeOut' }}
                  className="mt-4"
                >
                  <div className="text-lg font-semibold">Zgłoszenia możliwe do załączenia</div>
                  <AppTable
                    columns={getColumns(field, false)}
                    data={cruiseApplications.filter((application) => !field.state.value.includes(application.id))}
                    buttons={() => []}
                    emptyTableMessage="Brak zgłoszeń możliwych do załączenia"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      />
    </AppAccordion>
  );
}
