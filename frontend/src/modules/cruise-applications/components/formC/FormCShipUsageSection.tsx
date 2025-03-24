import { AppAccordion } from '@/core/components/AppAccordion';
import { AppDropdownInput } from '@/core/components/inputs/AppDropdownInput';
import { getErrors } from '@/core/lib/utils';
import { useFormC } from '@/cruise-applications/contexts/FormCContext';

export function FormCShipUsageSection() {
  const { form, isReadonly, formAInitValues, hasFormBeenSubmitted } = useFormC();

  return (
    <AppAccordion title="3. Sposób wykorzystania statku" expandedByDefault>
      <form.Field
        name="shipUsage"
        children={(field) => (
          <div className="lg:col-span-2">
            <AppDropdownInput
              name="shipUsage"
              value={field.state.value as string}
              onChange={(e) => field.handleChange(e as string)}
              onBlur={field.handleBlur}
              errors={getErrors(field.state.meta, hasFormBeenSubmitted)}
              label="Statek na potrzeby badań był wykorzystywany"
              allOptions={formAInitValues?.shipUsages.map((shipUsage, i) => ({
                value: i.toString(),
                inlineLabel: shipUsage,
              }))}
              disabled={isReadonly}
            />
          </div>
        )}
      />
    </AppAccordion>
  );
}
