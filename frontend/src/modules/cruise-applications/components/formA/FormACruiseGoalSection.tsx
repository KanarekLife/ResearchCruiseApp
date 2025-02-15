import { AppAccordion } from '@/core/components/AppAccordion';
import { AppDropdownInput } from '@/core/components/inputs/AppDropdownInput';
import { AppInput } from '@/core/components/inputs/AppInput';
import { mapValidationErrors } from '@/core/lib/utils';
import { FormAProps } from '@/cruise-applications/components/formA/FormASectionProps';
import { CruiseGoal } from '@/cruise-applications/models/FormADto';

export function FormACruiseGoalSection({ initValues, form, readonly }: FormAProps) {
  return (
    <AppAccordion title="5. Cel rejsu" expandedByDefault>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <form.Field
          name="cruiseGoal"
          children={(field) => (
            <AppDropdownInput
              name="cruiseGoal"
              value={field.state.value}
              onChange={(e) => field.handleChange(e as CruiseGoal)}
              onBlur={field.handleBlur}
              errors={mapValidationErrors(field.state.meta.errors)}
              label="Cel rejsu"
              allOptions={initValues.data.cruiseGoals.map((cruiseGoal, index) => ({
                value: index.toString(),
                inlineLabel: cruiseGoal,
              }))}
              required
              disabled={readonly}
            />
          )}
        />

        <form.Subscribe
          selector={(state) => state.values.cruiseGoal}
          children={(cruiseGoal) => (
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
                  disabled={!cruiseGoal || readonly}
                  required
                />
              )}
            />
          )}
        />
      </div>
    </AppAccordion>
  );
}
