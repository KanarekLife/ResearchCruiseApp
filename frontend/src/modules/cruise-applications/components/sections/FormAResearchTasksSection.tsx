import { ReactFormExtendedApi } from '@tanstack/react-form';
import { UseSuspenseQueryResult } from '@tanstack/react-query';

import { AppAccordion } from '@/core/components/AppAccordion';
import { AppButton } from '@/core/components/AppButton';
import { AppPopover } from '@/core/components/AppPopover';
import { AppTable } from '@/core/components/table/AppTable';
import { FormAResearchTaskThumbnail } from '@/cruise-applications/components/FormAResearchTaskThumbnail';
import { FormAResearchTaskDetails } from '@/cruise-applications/components/research-task-details/FormAResearchTaskDetails';
import {
  FormADto,
  FormAInitialState,
  FormAResearchTask,
  getEmptyTask,
  taskTypes,
} from '@/cruise-applications/lib/types';

type Props = {
  initialStateQuery: UseSuspenseQueryResult<FormAInitialState, Error>;
  form: ReactFormExtendedApi<FormADto, undefined>;
};

export function FormAResearchTasksSection({ initialStateQuery, form }: Props) {
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
                  size: 100,
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
                  size: 200,
                },
                {
                  header: 'Szczegóły',
                  cell: ({ row }) => <FormAResearchTaskDetails type={row.original.type} form={form} row={row} />,
                  size: 600,
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
                  size: 200,
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
                  className="w-80"
                >
                  Dodaj nowe zadanie
                </AppPopover>,
                <AppPopover
                  key="1"
                  modal={(setExpanded) => (
                    <div className="h-96 px-4 py-2 overflow-y-auto" tabIndex={-1}>
                      {Object.entries(
                        initialStateQuery.data.historicalResearchTasks.reduce(
                          (acc, task) => {
                            if (!acc[task.type]) acc[task.type] = [];
                            acc[task.type].push(task);
                            return acc;
                          },
                          {} as Record<string, FormAResearchTask[]>
                        )
                      ).map(([type, tasks]) => (
                        <div key={type}>
                          <h3 className="text-center text-gray-500 text-sm">{taskTypes[parseInt(type)]}</h3>
                          {tasks.map((task) => (
                            <AppButton
                              key={`${task.type}-${JSON.stringify(task)}`}
                              onClick={() => {
                                field.pushValue(task);
                                setExpanded(false);
                              }}
                              variant="plain"
                              className="w-full px-4 rounded-lg hover:bg-gray-100 focus:inset-ring-2 inset-ring-blue-500"
                            >
                              <FormAResearchTaskThumbnail task={task} />
                            </AppButton>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                  variant="primaryOutline"
                  className="w-80"
                >
                  Dodaj z historii
                </AppPopover>,
              ]}
              childForEmpty={<div className="text-center bg-gray-100 py-3">Nie dodano żadnego zadania</div>}
            />
          )}
        />
      </div>
    </AppAccordion>
  );
}
