import { AppAccordion } from '@/core/components/AppAccordion';
import { AppDropdownInput } from '@/core/components/inputs/AppDropdownInput';
import { AppInput } from '@/core/components/inputs/AppInput';
import { mapValidationErrors } from '@/core/lib/utils';
import { FormASectionProps } from '@/cruise-applications/components/formA/FormASectionProps';

export function FormAResearchAreaSection({ form, initValues }: FormASectionProps) {
  return (
    <AppAccordion title="4. Rejon prowadzenia badań" expandedByDefault>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
              label="Rejon prowadzenia badań"
              allOptions={initValues.data.researchAreas.map((researchArea) => ({
                value: researchArea.id,
                inlineLabel: researchArea.name,
              }))}
              required
            />
          )}
        />

        <form.Subscribe
          selector={(state) => state.values.researchAreaId}
          children={(researchAreaId) => (
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
                  disabled={!researchAreaId}
                />
              )}
            />
          )}
        />
      </div>
    </AppAccordion>
  );
}
