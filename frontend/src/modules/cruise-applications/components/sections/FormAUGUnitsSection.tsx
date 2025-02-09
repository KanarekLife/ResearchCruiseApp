import { ReactFormExtendedApi } from '@tanstack/react-form';
import { UseSuspenseQueryResult } from '@tanstack/react-query';

import { AppAccordion } from '@/core/components/AppAccordion';
import { AppButton } from '@/core/components/AppButton';
import { AppPopover } from '@/core/components/AppPopover';
import { AppDropdownInput } from '@/core/components/inputs/AppDropdownInput';
import { AppInput } from '@/core/components/inputs/AppInput';
import { AppNumberInput } from '@/core/components/inputs/AppNumberInput';
import { AppTable } from '@/core/components/table/AppTable';
import { mapValidationErrors } from '@/core/lib/utils';
import { FormADto, FormAInitialState } from '@/cruise-applications/lib/types';

type Props = {
  initialStateQuery: UseSuspenseQueryResult<FormAInitialState, Error>;
  form: ReactFormExtendedApi<FormADto, undefined>;
};
export function FormAUGUnitsSection({ initialStateQuery, form }: Props) {
  return (
    <AppAccordion title="8. Zespoły badawcze, które miałyby uczestniczyć w rejsie" expandedByDefault>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3>Uczestnictwo osób z jednostek organizacyjnych UG</h3>
          <form.Field
            name="ugTeams"
            mode="array"
            children={(field) => (
              <AppTable
                data={field.state.value}
                columns={[
                  {
                    header: 'Lp.',
                    cell: ({ row }) => `${row.index + 1}. `,
                  },
                  {
                    header: 'Jednostka',
                    accessorFn: (row) => row.ugUnitId,
                    cell: ({ row }) => (
                      <form.Field
                        key={row.index}
                        name={`ugTeams[${row.index}].ugUnitId`}
                        children={(field) => (
                          <AppDropdownInput
                            name={field.name}
                            value={field.state.value}
                            onChange={field.handleChange}
                            onBlur={field.handleBlur}
                            errors={mapValidationErrors(field.state.meta.errors)}
                            allOptions={initialStateQuery.data?.ugUnits.map((unit) => ({
                              value: unit.id,
                              inlineLabel: unit.name,
                            }))}
                          />
                        )}
                      />
                    ),
                  },
                  {
                    header: 'Liczba pracowników',
                    accessorFn: (row) => row.noOfEmployees,
                    cell: ({ row }) => (
                      <form.Field
                        key={row.index}
                        name={`ugTeams[${row.index}].noOfEmployees`}
                        children={(field) => (
                          <AppNumberInput
                            name={field.name}
                            value={parseInt(field.state.value)}
                            onChange={(e) => field.handleChange(e.currentTarget.value)}
                            onBlur={field.handleBlur}
                            errors={mapValidationErrors(field.state.meta.errors)}
                            onIncrement={() => field.handleChange((value) => (parseInt(value) + 1).toString())}
                            onDecrement={() => field.handleChange((value) => (parseInt(value) - 1).toString())}
                          />
                        )}
                      />
                    ),
                  },
                  {
                    header: 'Liczba studentów',
                    accessorFn: (row) => row.noOfStudents,
                    cell: ({ row }) => (
                      <form.Field
                        key={row.index}
                        name={`ugTeams[${row.index}].noOfStudents`}
                        children={(field) => (
                          <AppNumberInput
                            name={field.name}
                            value={parseInt(field.state.value)}
                            onChange={(e) => field.handleChange(e.currentTarget.value)}
                            onBlur={field.handleBlur}
                            errors={mapValidationErrors(field.state.meta.errors)}
                            onIncrement={() => field.handleChange((value) => (parseInt(value) + 1).toString())}
                            onDecrement={() => field.handleChange((value) => (parseInt(value) - 1).toString())}
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
                buttons={() => [
                  <AppPopover
                    key="add-new"
                    variant="primary"
                    className="w-80"
                    modal={(setExpanded) => (
                      <div className="h-96 overflow-y-auto" tabIndex={-1}>
                        {initialStateQuery.data.ugUnits.map((unit) => (
                          <AppButton
                            key={unit.id}
                            onClick={() => {
                              field.pushValue({ ugUnitId: unit.id, noOfEmployees: '0', noOfStudents: '0' });
                              setExpanded(false);
                            }}
                            variant="plain"
                            className="w-full px-4 rounded-lg hover:bg-gray-100 focus:inset-ring-2 inset-ring-blue-500"
                          >
                            {unit.name}
                          </AppButton>
                        ))}
                      </div>
                    )}
                  >
                    Dodaj nowe
                  </AppPopover>,
                ]}
              />
            )}
          />
        </div>
        <div>
          <h3>Uczestnictwo gości spoza UG</h3>
          <form.Field
            name="guestTeams"
            mode="array"
            children={(field) => (
              <AppTable
                data={field.state.value}
                columns={[
                  {
                    header: 'Lp.',
                    cell: ({ row }) => `${row.index + 1}. `,
                  },
                  {
                    header: 'Jednostka',
                    accessorFn: (row) => row.name,
                    cell: ({ row }) => (
                      <form.Field
                        key={row.index}
                        name={`guestTeams[${row.index}].name`}
                        children={(field) => (
                          <AppInput
                            name={field.name}
                            value={field.state.value}
                            onChange={field.handleChange}
                            onBlur={field.handleBlur}
                            errors={mapValidationErrors(field.state.meta.errors)}
                          />
                        )}
                      />
                    ),
                  },
                  {
                    header: 'Liczba pracowników',
                    accessorFn: (row) => row.noOfPersons,
                    cell: ({ row }) => (
                      <form.Field
                        key={row.index}
                        name={`guestTeams[${row.index}].noOfPersons`}
                        children={(field) => (
                          <AppNumberInput
                            name={field.name}
                            value={parseInt(field.state.value)}
                            onChange={(e) => field.handleChange(e.currentTarget.value)}
                            onBlur={field.handleBlur}
                            errors={mapValidationErrors(field.state.meta.errors)}
                            onIncrement={() => field.handleChange((value) => (parseInt(value) + 1).toString())}
                            onDecrement={() => field.handleChange((value) => (parseInt(value) - 1).toString())}
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
                buttons={() => [
                  <AppButton
                    key="add-new"
                    onClick={() => field.pushValue({ name: '', noOfPersons: '0' })}
                    variant="primary"
                    className="w-full"
                  >
                    Dodaj nowe
                  </AppButton>,
                  <AppPopover
                    key="add-from-history"
                    variant="primaryOutline"
                    className="w-80"
                    modal={(setExpanded) => (
                      <div className="h-96 overflow-y-auto" tabIndex={-1}>
                        {initialStateQuery.data.historicalGuestInstitutions.map((institution) => (
                          <AppButton
                            key={institution}
                            onClick={() => {
                              field.pushValue({ name: institution, noOfPersons: '0' });
                              setExpanded(false);
                            }}
                            variant="plain"
                            className="w-full px-4 rounded-lg hover:bg-gray-100 focus:inset-ring-2 inset-ring-blue-500"
                          >
                            {institution}
                          </AppButton>
                        ))}
                      </div>
                    )}
                  >
                    Dodaj z historii
                  </AppPopover>,
                ]}
              />
            )}
          />
        </div>
      </div>
    </AppAccordion>
  );
}
