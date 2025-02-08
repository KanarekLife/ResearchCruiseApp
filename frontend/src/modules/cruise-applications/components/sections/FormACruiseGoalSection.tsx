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

export function FormACruiseGoalSection({ initialStateQuery, form }: Props) {
  return (
    <AppAccordion title="5. Cel rejsu" expandedByDefault>
      <div className="space-y-4">
        <form.Field
          name="cruiseGoal"
          children={(field) => (
            <AppDropdownInput
              name="cruiseGoal"
              value={field.state.value}
              onChange={(e) => field.handleChange(e as string)}
              onBlur={field.handleBlur}
              errors={mapValidationErrors(field.state.meta.errors)}
              label="Cel rejsu"
              allOptions={initialStateQuery.data?.cruiseGoals.map((cruiseGoal) => ({
                value: cruiseGoal,
                inlineLabel: cruiseGoal,
              }))}
              required
            />
          )}
        />

        <form.Field
          name="cruiseGoalDescription"
          children={(field) => (
            <AppInput
              name={field.name}
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={mapValidationErrors(field.state.meta.errors)}
              label="Opis"
              placeholder="np. szczegóły dotyczące celu rejsu"
            />
          )}
        />
      </div>
    </AppAccordion>
  );
}
