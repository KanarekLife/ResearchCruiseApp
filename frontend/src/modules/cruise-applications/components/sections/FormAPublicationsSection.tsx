import { ReactFormExtendedApi } from '@tanstack/react-form';
import { UseSuspenseQueryResult } from '@tanstack/react-query';

import { AppAccordion } from '@/core/components/AppAccordion';
import { AppButton } from '@/core/components/AppButton';
import { AppPopover } from '@/core/components/AppPopover';
import { AppDropdownInput } from '@/core/components/inputs/AppDropdownInput';
import { AppInput } from '@/core/components/inputs/AppInput';
import { AppNumberInput } from '@/core/components/inputs/AppNumberInput';
import { AppYearPickerInput } from '@/core/components/inputs/dates/AppYearPickerInput';
import { AppTable } from '@/core/components/table/AppTable';
import { mapValidationErrors } from '@/core/lib/utils';
import { FormADto, FormAInitialState, FormAPublicationDto } from '@/cruise-applications/lib/types';

type Props = {
  initialStateQuery: UseSuspenseQueryResult<FormAInitialState, Error>;
  form: ReactFormExtendedApi<FormADto, undefined>;
};
export function FormAPublicationsSection({ initialStateQuery, form }: Props) {
  return (
    <AppAccordion title="9. Publikacje" expandedByDefault>
      <header className="text-center space-y-4">
        <h3 className="text-xl">
          Publikacje kategorii <span className="font-semibold">temat</span>
        </h3>
        <p className="text-sm">
          Publikacje z ubiegłych 5 lat związane <span className="font-semibold">bezpośrednio</span> tematycznie z
          zadaniami do realizacji na planowanym rejsie{' '}
          <span className="font-semibold">
            opublikowane przez zespoł zaangażowany w realizację rejsu – z afiliacją UG.
          </span>
        </p>
        <h3 className="text-xl">
          Publikacje kategorii <span className="font-semibold">dopisek</span>
        </h3>
        <p className="text-sm">
          Publikacje autorstwa zespołu zaangażowanego w realizację rejsu, ALE zawierające dopisek w treści publikacji (w
          wersji angielskiej lub w innym języku):{' '}
          <span className="font-semibold">
            „…the research/study was conducted onboard r/v Oceanograf (the research vessel owned by the University of
            Gdańsk)…”
          </span>
          ,
          <span className="font-semibold">
            „… samples for the present study were collected during a research cruise onboard r/v Oceanograf…”{' '}
          </span>
          lub podobny, ale wskazujący jednoznacznie, że badania w ramach niniejszej publikacji były prowadzone z pokładu
          jednostki RV Oceanograf.
        </p>
      </header>
      <form.Field
        name="publications"
        mode="array"
        children={(field) => (
          <AppTable
            columns={[
              {
                header: 'Lp.',
                cell: ({ row }) => `${row.index + 1}. `,
              },
              {
                accessorFn: (row) => row.category,
                header: 'Kategoria',
                cell: ({ row }) => (
                  <form.Field
                    key={row.index}
                    name={`publications[${row.index}].category`}
                    children={(field) => (
                      <AppDropdownInput
                        name={field.name}
                        value={field.state.value}
                        onChange={field.handleChange}
                        onBlur={field.handleBlur}
                        errors={mapValidationErrors(field.state.meta.errors)}
                        allOptions={[
                          { value: 'subject', inlineLabel: 'Temat' },
                          { value: 'postscript', inlineLabel: 'Dopisek' },
                        ]}
                        required
                      />
                    )}
                  />
                ),
              },
              {
                header: 'Informacje',
                cell: ({ row }) => (
                  <div className="grid grid-cols-2 gap-4">
                    <form.Field
                      key={row.index}
                      name={`publications[${row.index}].doi`}
                      children={(field) => (
                        <AppInput
                          name={field.name}
                          value={field.state.value}
                          onChange={field.handleChange}
                          onBlur={field.handleBlur}
                          errors={mapValidationErrors(field.state.meta.errors)}
                          placeholder="DOI"
                          className="mx-4"
                        />
                      )}
                    />
                    <form.Field
                      key={row.index}
                      name={`publications[${row.index}].authors`}
                      children={(field) => (
                        <AppInput
                          name={field.name}
                          value={field.state.value}
                          onChange={field.handleChange}
                          onBlur={field.handleBlur}
                          errors={mapValidationErrors(field.state.meta.errors)}
                          placeholder="Autorzy"
                          className="mx-4"
                        />
                      )}
                    />
                    <form.Field
                      key={row.index}
                      name={`publications[${row.index}].title`}
                      children={(field) => (
                        <AppInput
                          name={field.name}
                          value={field.state.value}
                          onChange={field.handleChange}
                          onBlur={field.handleBlur}
                          errors={mapValidationErrors(field.state.meta.errors)}
                          placeholder="Tytuł"
                          className="mx-4"
                        />
                      )}
                    />
                    <form.Field
                      key={row.index}
                      name={`publications[${row.index}].magazine`}
                      children={(field) => (
                        <AppInput
                          name={field.name}
                          value={field.state.value}
                          onChange={field.handleChange}
                          onBlur={field.handleBlur}
                          errors={mapValidationErrors(field.state.meta.errors)}
                          placeholder="Czasopismo"
                          className="mx-4"
                        />
                      )}
                    />
                  </div>
                ),
              },
              {
                header: 'Rok Wydania',
                accessorFn: (row) => row.year,
                cell: ({ row }) => (
                  <form.Field
                    key={row.index}
                    name={`publications[${row.index}].year`}
                    children={(field) => (
                      <AppYearPickerInput
                        name={field.name}
                        value={parseInt(field.state.value)}
                        onChange={(e) => field.handleChange(e?.toString() ?? '1900')}
                        onBlur={field.handleBlur}
                        errors={mapValidationErrors(field.state.meta.errors)}
                        required
                      />
                    )}
                  />
                ),
              },
              {
                header: 'Punkty Ministerialne',
                accessorFn: (row) => row.MinisterialPoints,
                cell: ({ row }) => (
                  <form.Field
                    key={row.index}
                    name={`publications[${row.index}].MinisterialPoints`}
                    children={(field) => (
                      <AppNumberInput
                        name={field.name}
                        value={parseInt(field.state.value)}
                        onChange={(e) => field.handleChange(e?.toString() ?? '0')}
                        onBlur={field.handleBlur}
                        errors={mapValidationErrors(field.state.meta.errors)}
                        onIncrement={() => field.handleChange((parseInt(field.state.value) + 1).toString())}
                        onDecrement={() => field.handleChange((parseInt(field.state.value) - 1).toString())}
                        className="mx-4"
                      />
                    )}
                  />
                ),
              },
              {
                header: 'Akcje',
                cell: ({ row }) => (
                  <AppButton
                    onClick={() => field.removeValue(row.index)}
                    variant="danger"
                    className="w-full px-4 rounded-lg"
                  >
                    Usuń
                  </AppButton>
                ),
              },
            ]}
            data={field.state.value}
            buttons={() => [
              <AppPopover
                key="addPublication"
                modal={(setExpanded) => (
                  <div className="h-96 overflow-y-auto" tabIndex={-1}>
                    <AppButton
                      key="addPublication.subject"
                      onClick={() => {
                        field.pushValue({
                          category: 'subject',
                          doi: '',
                          authors: '',
                          title: '',
                          magazine: '',
                          year: '1900',
                          MinisterialPoints: '0',
                        });
                        setExpanded(false);
                      }}
                      variant="plain"
                      className="w-full px-4 rounded-lg hover:bg-gray-100 focus:inset-ring-2 inset-ring-blue-500"
                    >
                      Temat
                    </AppButton>
                    <AppButton
                      key="addPublication.postscript"
                      onClick={() => {
                        field.pushValue({
                          category: 'postscript',
                          doi: '',
                          authors: '',
                          title: '',
                          magazine: '',
                          year: '1900',
                          MinisterialPoints: '0',
                        });
                        setExpanded(false);
                      }}
                      variant="plain"
                      className="w-full px-4 rounded-lg hover:bg-gray-100 focus:inset-ring-2 inset-ring-blue-500"
                    >
                      Dopisek
                    </AppButton>
                  </div>
                )}
                variant="primary"
                className="w-80"
              >
                Dodaj nową publikację
              </AppPopover>,
              <AppPopover
                key="1"
                modal={(setExpanded) => (
                  <div className="h-96 px-4 py-2 overflow-y-auto" tabIndex={-1}>
                    {Object.entries(
                      initialStateQuery.data.historicalPublications.reduce(
                        (acc, publication) => {
                          if (!acc[publication.category]) acc[publication.category] = [];
                          acc[publication.category].push(publication);
                          return acc;
                        },
                        {} as Record<string, FormAPublicationDto[]>
                      )
                    ).map(([category, publications]) => (
                      <div key={category}>
                        <h3 className="text-center text-gray-500 text-sm">
                          {category === 'subject' ? 'Temat' : 'Dopisek'}
                        </h3>
                        {publications.map((publication) => (
                          <AppButton
                            key={`${publication.category}-${JSON.stringify(publication)}`}
                            onClick={() => {
                              field.pushValue(publication);
                              setExpanded(false);
                            }}
                            variant="plain"
                            className="w-full px-4 rounded-lg hover:bg-gray-100 focus:inset-ring-2 inset-ring-blue-500"
                          >
                            DOI: {publication.doi}, Autorzy: {publication.authors}, Tytuł: {publication.title},
                            Czasopismo: {publication.magazine}, Rok: {publication.year}, Punkty:{' '}
                            {publication.MinisterialPoints}
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
            childForEmpty={<div className="text-center bg-gray-100 py-3">Nie dodano żadnej publikacji</div>}
          />
        )}
      />
    </AppAccordion>
  );
}
