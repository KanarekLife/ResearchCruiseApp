import { AnimatePresence, motion } from 'motion/react';

import { AppAccordion } from '@/core/components/AppAccordion';
import { AppDropdownInput } from '@/core/components/inputs/AppDropdownInput';
import { AppInput } from '@/core/components/inputs/AppInput';
import { AppNumberInput } from '@/core/components/inputs/AppNumberInput';
import { mapValidationErrors } from '@/core/lib/utils';
import { FormAProps } from '@/cruise-applications/components/formA/FormASectionProps';
import { FormAPeriodInput } from '@/cruise-applications/components/FormAPeriodInput';

export function FormACruiseLengthSection({ initValues, form, readonly }: FormAProps) {
  return (
    <AppAccordion title="2. Czas trwania zgłaszanego rejsu" expandedByDefault>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <form.Field
          name="acceptablePeriod"
          children={(field) => (
            <FormAPeriodInput
              name={field.name}
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={mapValidationErrors(field.state.meta.errors)}
              label="Dopuszczalny okres, w którym miałby się odbywać rejs"
              required
              disabled={readonly}
            />
          )}
        />

        <form.Subscribe
          selector={(state) => state.values.acceptablePeriod}
          children={(acceptablePeriod) => (
            <form.Field
              name="optimalPeriod"
              children={(field) => (
                <FormAPeriodInput
                  name={field.name}
                  value={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                  errors={mapValidationErrors(field.state.meta.errors)}
                  maxValues={acceptablePeriod}
                  label="Optymalny okres, w którym miałby się odbywać rejs"
                  required
                  disabled={readonly}
                />
              )}
            />
          )}
        />

        <form.Subscribe
          selector={(state) => state.values.cruiseHours}
          children={(cruiseHours) => {
            return (
              <form.Field
                name="cruiseHours"
                children={(field) => (
                  <AppNumberInput
                    name={field.name}
                    value={Math.floor((parseInt(cruiseHours) / 24) * 100) / 100}
                    onChange={(e) => field.handleChange((Number(e.target.value) * 24).toString())}
                    onIncrement={() =>
                      field.handleChange(((Math.floor(parseInt(cruiseHours) / 24) + 1) * 24).toString())
                    }
                    onDecrement={() =>
                      field.handleChange(((Math.floor(parseInt(cruiseHours) / 24) - 1) * 24).toString())
                    }
                    onBlur={field.handleBlur}
                    errors={mapValidationErrors(field.state.meta.errors)}
                    label="Liczba planowanych dób rejsowych"
                    required
                    disabled={readonly}
                  />
                )}
              />
            );
          }}
        />

        <form.Subscribe
          selector={(state) => state.values.cruiseHours}
          children={(cruiseHours) => {
            return (
              <form.Field
                name="cruiseHours"
                children={(field) => (
                  <AppNumberInput
                    name={field.name}
                    value={parseInt(cruiseHours)}
                    onChange={(e) => field.handleChange(Number(e.target.value).toString())}
                    onIncrement={() => field.handleChange((parseInt(cruiseHours) + 1).toString())}
                    onDecrement={() => field.handleChange((parseInt(cruiseHours) - 1).toString())}
                    onBlur={field.handleBlur}
                    errors={mapValidationErrors(field.state.meta.errors)}
                    label="Liczba planowanych godzin rejsowych"
                    required
                    disabled={readonly}
                  />
                )}
              />
            );
          }}
        />

        <form.Field
          name="periodNotes"
          children={(field) => (
            <div className="lg:col-span-2">
              <AppInput
                name={field.name}
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                errors={mapValidationErrors(field.state.meta.errors)}
                label="Uwagi dotyczące teminu"
                placeholder='np. "Rejs w okresie wakacyjnym"'
                disabled={readonly}
              />
            </div>
          )}
        />

        <form.Field
          name="shipUsage"
          children={(field) => (
            <div className="lg:col-span-2">
              <AppDropdownInput
                name="shipUsage"
                value={field.state.value as string | number}
                onChange={(e) => field.handleChange(e as string)}
                onBlur={field.handleBlur}
                errors={mapValidationErrors(field.state.meta.errors)}
                label="Statek na potrzeby badań będzie wykorzystywany"
                allOptions={initValues.data?.shipUsages.map((shipUsage, i) => ({
                  value: i.toString(),
                  inlineLabel: shipUsage,
                }))}
                disabled={readonly}
              />
            </div>
          )}
        />

        <form.Subscribe
          selector={(state) => state.values.shipUsage}
          children={(shipUsage) => (
            <div className="lg:col-span-2">
              <AnimatePresence>
                {shipUsage === '4' && (
                  <motion.div
                    initial={{ opacity: 0, translateY: '-10%' }}
                    animate={{ opacity: 1, translateY: '0' }}
                    exit={{ opacity: 0, translateY: '-10%' }}
                    transition={{ ease: 'easeOut', duration: 0.2 }}
                  >
                    <form.Field
                      name="differentUsage"
                      children={(field) => (
                        <AppInput
                          name={field.name}
                          value={field.state.value}
                          onChange={field.handleChange}
                          onBlur={field.handleBlur}
                          errors={mapValidationErrors(field.state.meta.errors)}
                          label="Inny sposób użycia"
                          placeholder="np. statek badawczy"
                          required
                          disabled={readonly}
                        />
                      )}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        />
      </div>
    </AppAccordion>
  );
}
