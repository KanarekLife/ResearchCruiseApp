import { ReactFormExtendedApi } from '@tanstack/react-form';
import { UseSuspenseQueryResult } from '@tanstack/react-query';

import { AppAccordion } from '@/core/components/AppAccordion';
import { AppButton } from '@/core/components/AppButton';
import { AppPopover } from '@/core/components/AppPopover';
import { AppDropdownInput } from '@/core/components/inputs/AppDropdownInput';
import { AppTable } from '@/core/components/table/AppTable';
import { mapValidationErrors } from '@/core/lib/utils';
import { FormADto, FormAInitialState, getEmptyTask, taskTypes } from '@/formA/lib/types';

type Props = {
  initialStateQuery: UseSuspenseQueryResult<FormAInitialState, Error>;
  form: ReactFormExtendedApi<FormADto, undefined>;
};

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
                      children={(field) => (
                        <AppDropdownInput
                          name={field.name}
                          value={field.state.value}
                          onChange={field.handleChange}
                          onBlur={field.handleBlur}
                          errors={mapValidationErrors(field.state.meta.errors)}
                          allOptions={taskTypes.map((type, i) => ({ value: i.toString(), inlineLabel: type }))}
                          showEmptyOption={false}
                        />
                      )}
                    />
                  ),
                },
                // {
                //   header: 'Opis',
                //   cell: ({ row }) => (
                //     <form.Field
                //       key={row.index}
                //       name={`researchTasks[${row.index}].description`}
                //       children={(field) => (
                //         <div>
                //           <AppInput />
                //         </div>
                //       )}
                //     />
                //   ),
                // },
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
                  modal={
                    <div className="h-96 overflow-y-auto" tabIndex={-1}>
                      {taskTypes.map((type) => (
                        <AppButton
                          key={type}
                          onClick={() => field.pushValue(getEmptyTask(type))}
                          variant="plain"
                          className="w-full px-4 rounded-lg hover:bg-gray-100 focus:inset-ring-2 inset-ring-blue-500"
                        >
                          {type}
                        </AppButton>
                      ))}
                    </div>
                  }
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
