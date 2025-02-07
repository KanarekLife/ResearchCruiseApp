import { ReactFormExtendedApi } from '@tanstack/react-form';
import { UseSuspenseQueryResult } from '@tanstack/react-query';
import { Row } from '@tanstack/react-table';

import { AppAccordion } from '@/core/components/AppAccordion';
import { AppButton } from '@/core/components/AppButton';
import { AppPopover } from '@/core/components/AppPopover';
import { AppTable } from '@/core/components/table/AppTable';
import { FormAAuthorTitleTaskDetails } from '@/formA/components/research-task-details/FormAAuthorTitleTaskDetails';
import { FormATitleDateFinancingApprovedTaskDetails } from '@/formA/components/research-task-details/FormATitleDateFinancingApprovedTaskDetails';
import { FormATitleFinancingAmountSecuredAmountWithDatesTaskDetails } from '@/formA/components/research-task-details/FormATitleFinancingAmountSecuredAmountWithDatesTaskDetails';
import { FormADto, FormAInitialState, FormAResearchTask, getEmptyTask, taskTypes } from '@/formA/lib/types';

type Props = {
  initialStateQuery: UseSuspenseQueryResult<FormAInitialState, Error>;
  form: ReactFormExtendedApi<FormADto, undefined>;
};

function getTaskDetailsComponent(
  type: string,
  form: ReactFormExtendedApi<FormADto, undefined>,
  row: Row<FormAResearchTask>
) {
  if (['0', '1', '2'].includes(type)) {
    return <FormAAuthorTitleTaskDetails form={form} row={row} />;
  }
  if (type === '3') {
    return <FormATitleDateFinancingApprovedTaskDetails form={form} row={row} />;
  }
  if (['4', '5', '6', '7', '8'].includes(type)) {
    return <FormATitleFinancingAmountSecuredAmountWithDatesTaskDetails form={form} row={row} />;
  }
  return null;
}

export function FormAResearchTasksSection({ form }: Props) {
  return (
    <AppAccordion title="6. Zadania do zrealizowania w trakcie rejsu" expandedByDefault>
      <div>
        <form.Field
          name="researchTasks"
          mode="array"
          children={(field) => (
            <AppTable
              data={field.state.value}
              columns={[
                {
                  header: 'Lp.',
                  accessorFn: (_, index) => `${index + 1}. `,
                },
                {
                  header: 'Zadanie',
                  accessorFn: (row) => row.type,
                  cell: ({ row }) => (
                    <form.Field
                      key={row.index}
                      name={`researchTasks[${row.index}].type`}
                      children={(field) => taskTypes.at(parseInt(field.state.value)) ?? 'Nieznany typ'}
                    />
                  ),
                },
                {
                  header: 'Szczegóły',
                  cell: ({ row }) => {
                    return getTaskDetailsComponent(row.original.type, form, row);
                  },
                },
                {
                  header: 'Akcje',
                  cell: ({ row }) => (
                    <div className="flex justify-center items-center">
                      <AppButton onClick={() => field.removeValue(row.index)} variant="dangerOutline">
                        Usuń
                      </AppButton>
                    </div>
                  ),
                },
              ]}
              buttons={() => [
                <AppPopover
                  key="0"
                  modal={(setExpanded) => (
                    <div className="h-96 overflow-y-auto" tabIndex={-1}>
                      {taskTypes.map((type) => (
                        <AppButton
                          key={type}
                          onClick={() => {
                            field.pushValue(getEmptyTask(type));
                            setExpanded(false);
                          }}
                          variant="plain"
                          className="w-full px-4 rounded-lg hover:bg-gray-100 focus:inset-ring-2 inset-ring-blue-500"
                        >
                          {type}
                        </AppButton>
                      ))}
                    </div>
                  )}
                  variant="primary"
                  className="w-56"
                >
                  Dodaj zadanie
                </AppPopover>,
              ]}
            />
          )}
        />
      </div>
    </AppAccordion>
  );
}
