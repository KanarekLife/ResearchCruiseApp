import { ReactFormExtendedApi } from '@tanstack/react-form';
import { UseSuspenseQueryResult } from '@tanstack/react-query';

import { AppAccordion } from '@/core/components/AppAccordion';
import { AppButton } from '@/core/components/AppButton';
import { AppPopover } from '@/core/components/AppPopover';
import { AppDropdownInput } from '@/core/components/inputs/AppDropdownInput';
import { AppInput } from '@/core/components/inputs/AppInput';
import { AppTable } from '@/core/components/table/AppTable';
import { FormAContract, FormADto, FormAInitialState } from '@/cruise-applications/lib/types';

type Props = {
  initialStateQuery: UseSuspenseQueryResult<FormAInitialState, Error>;
  form: ReactFormExtendedApi<FormADto, undefined>;
};
export function FormAContractsSection({ initialStateQuery, form }: Props) {
  return (
    <AppAccordion
      title="7. Umowy regulujące współpracę, w ramach której miałyby być realizowane zadania badawcze"
      expandedByDefault
    >
      <div>
        <form.Field
          name="contracts"
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
                  header: 'Kategoria',
                  accessorFn: (row) => row.category,
                  cell: ({ row }) => (
                    <form.Field
                      key={row.index}
                      name={`contracts[${row.index}].category`}
                      children={(field) => (
                        <div className="p-4">
                          <AppDropdownInput
                            name={field.name}
                            value={field.state.value}
                            onChange={field.handleChange}
                            onBlur={field.handleBlur}
                            allOptions={[
                              { inlineLabel: 'Krajowa', value: 'domestic' },
                              { inlineLabel: 'Międzynarodowa', value: 'international' },
                            ]}
                          />
                        </div>
                      )}
                    />
                  ),
                },
                {
                  header: 'Instytucja',
                  cell: ({ row }) => (
                    <div className="grid grid-cols-1 p-4">
                      <form.Field
                        key={row.index}
                        name={`contracts[${row.index}].institutionName`}
                        children={(field) => (
                          <AppInput
                            name={field.name}
                            value={field.state.value}
                            onChange={field.handleChange}
                            onBlur={field.handleBlur}
                            label="Nazwa instytucji"
                            placeholder='np. "Uniwersytet Gdański"'
                          />
                        )}
                      />

                      <form.Field
                        key={row.index}
                        name={`contracts[${row.index}].institutionUnit`}
                        children={(field) => (
                          <AppInput
                            name={field.name}
                            value={field.state.value}
                            onChange={field.handleChange}
                            onBlur={field.handleBlur}
                            label="Jednostka instytucji"
                            placeholder="np. Wydział Matematyki, Fizyki i Informatyki"
                          />
                        )}
                      />

                      <form.Field
                        key={row.index}
                        name={`contracts[${row.index}].institutionLocalization`}
                        children={(field) => (
                          <AppInput
                            name={field.name}
                            value={field.state.value}
                            onChange={field.handleChange}
                            onBlur={field.handleBlur}
                            label="Lokalizacja instytucji"
                            placeholder="np. Gdańsk"
                          />
                        )}
                      />
                    </div>
                  ),
                },
                {
                  header: 'Opis',
                  accessorFn: (row) => row.description,
                  cell: ({ row }) => (
                    <form.Field
                      key={row.index}
                      name={`contracts[${row.index}].description`}
                      children={(field) => (
                        <div className="p-4">
                          <AppInput
                            name={field.name}
                            value={field.state.value}
                            onChange={field.handleChange}
                            onBlur={field.handleBlur}
                            placeholder="np. Umowa o współpracy w zakresie badań nad fauną morską"
                          />
                        </div>
                      )}
                    />
                  ),
                },
                {
                  header: 'Skan',
                  accessorFn: (row) => row.scan.name,
                  cell: ({ row }) => (
                    <form.Field
                      key={row.index}
                      name={`contracts[${row.index}].scan`}
                      children={() => <span>TODO</span>}
                    />
                  ),
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
                <AppButton
                  key="add-new"
                  onClick={() =>
                    field.pushValue({
                      category: 'domestic',
                      institutionName: '',
                      institutionUnit: '',
                      institutionLocalization: '',
                      description: '',
                      scan: { name: '', content: '' },
                    })
                  }
                  variant="primary"
                >
                  Dodaj nową umowę
                </AppButton>,
                <AppPopover
                  key="1"
                  modal={(setExpanded) => (
                    <div className="h-96 px-4 py-2 overflow-y-auto" tabIndex={-1}>
                      {Object.entries(
                        initialStateQuery.data.historicalContracts.reduce(
                          (acc, contract) => {
                            if (!acc[contract.category]) acc[contract.category] = [];
                            acc[contract.category].push(contract);
                            return acc;
                          },
                          {} as Record<'domestic' | 'international', FormAContract[]>
                        )
                      ).map(([category, contracts]) => (
                        <div key={category}>
                          <h3 className="text-center text-gray-500 text-sm">
                            {category === 'domestic' ? 'Krajowa' : 'Międzynarodowa'}
                          </h3>
                          {contracts.map((contract) => (
                            <AppButton
                              key={`${contract.category}-${JSON.stringify(contract)}`}
                              onClick={() => {
                                field.pushValue(contract);
                                setExpanded(false);
                              }}
                              variant="plain"
                              className="w-full px-4 rounded-lg hover:bg-gray-100 focus:inset-ring-2 inset-ring-blue-500"
                            >
                              {contract.institutionName}, {contract.institutionUnit}, {contract.institutionLocalization}
                              : {contract.description}
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
            />
          )}
        />
      </div>
    </AppAccordion>
  );
}
