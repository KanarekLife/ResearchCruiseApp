import { ReactFormExtendedApi } from '@tanstack/react-form';
import { UseSuspenseQueryResult } from '@tanstack/react-query';

import { AppAccordion } from '@/core/components/AppAccordion';
import { AppDropdownInput } from '@/core/components/inputs/AppDropdownInput';
import { AppInput } from '@/core/components/inputs/AppInput';
import { mapValidationErrors } from '@/core/lib/utils';
import { FormADto, FormAInitialState } from '@/cruise-applications/lib/types';

type Props = {
  initialStateQuery: UseSuspenseQueryResult<FormAInitialState, Error>;
  form: ReactFormExtendedApi<FormADto, undefined>;
};

export function FormAResearchAreaSection({ initialStateQuery, form }: Props) {
  return (
    <AppAccordion title="4. Region prowadzenia badań" expandedByDefault>
      <div>
        <form.Field
          name="researchAreaId"
          children={(field) => (
            <AppDropdownInput
              name="researchAreaId"
              value={field.state.value}
              onChange={(e) => {
                field.handleChange(e as string);
                if (!e) {
                  form.setFieldValue('researchAreaInfo', '');
                }
              }}
              onBlur={field.handleBlur}
              errors={mapValidationErrors(field.state.meta.errors)}
              label="Region prowadzenia badań"
              allOptions={initialStateQuery.data?.researchAreas.map((researchArea) => ({
                value: researchArea.id,
                inlineLabel: researchArea.name,
              }))}
            />
          )}
        />

        <form.Subscribe
          selector={(state) => state.values.researchAreaId}
          children={(researchAreaId) => (
            <>
              {!!researchAreaId && (
                <form.Field
                  name="researchAreaInfo"
                  children={(field) => (
                    <AppInput
                      name={field.name}
                      value={field.state.value}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      errors={mapValidationErrors(field.state.meta.errors)}
                      label="Informacje dodatkowe"
                      placeholder="np. szczegóły dotyczące regionu"
                    />
                  )}
                />
              )}
            </>
          )}
        />
      </div>
    </AppAccordion>
  );
}
