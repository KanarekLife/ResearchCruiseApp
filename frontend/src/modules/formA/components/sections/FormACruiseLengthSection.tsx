import { ReactFormExtendedApi } from '@tanstack/react-form';
import { UseSuspenseQueryResult } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'motion/react';

import { AppAccordion } from '@/core/components/AppAccordion';
import { AppDropdownInput } from '@/core/components/inputs/AppDropdownInput';
import { AppInput } from '@/core/components/inputs/AppInput';
import { AppNumberInput } from '@/core/components/inputs/AppNumberInput';
import { mapValidationErrors } from '@/core/lib/utils';
import { FormAPeriodInput } from '@/formA/components/FormAPeriodInput';
import { FormADto, FormAInitialState } from '@/formA/lib/types';

type Props = {
  initialStateQuery: UseSuspenseQueryResult<FormAInitialState, Error>;
  form: ReactFormExtendedApi<FormADto, undefined>;
};

export function FormACruiseLengthSection({ initialStateQuery, form }: Props) {
  return (
    <AppAccordion title="2. Czas trwania zgłaszanego rejsu" expandedByDefault>
      <div className="grid grid-cols-2 gap-8">
        <form.Field
          name="acceptablePeriod"
          children={(field) => (
            <FormAPeriodInput
              name="acceptablePeriod"
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={mapValidationErrors(field.state.meta.errors)}
              label="Dopuszczalny okres, w którym miałby się odbywać rejs"
            />
          )}
        />

        <form.Subscribe
          selector={(state) => state.values.acceptablePeriod}
          children={(acceptablePeriod) => {
            return (
              <>
                <form.Field
                  name="optimalPeriod"
                  children={(field) => (
                    <FormAPeriodInput
                      name="optimalPeriod"
                      value={field.state.value}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      errors={mapValidationErrors(field.state.meta.errors)}
                      maxValues={acceptablePeriod}
                      label="Optymalny okres, w którym miałby się odbywać rejs"
                    />
                  )}
                />
              </>
            );
          }}
        />

        <form.Subscribe
          selector={(state) => state.values.cruiseHours}
          children={(cruiseHours) => {
            return (
              <>
                <form.Field
                  name="cruiseHours"
                  children={(field) => (
                    <AppNumberInput
                      name={field.name}
                      value={Math.floor((cruiseHours / 24) * 100) / 100}
                      onChange={(e) => field.handleChange(Number(e.target.value) * 24)}
                      onIncrement={() => field.handleChange((Math.floor(cruiseHours / 24) + 1) * 24)}
                      onDecrement={() => field.handleChange((Math.floor(cruiseHours / 24) - 1) * 24)}
                      onBlur={field.handleBlur}
                      errors={mapValidationErrors(field.state.meta.errors)}
                      label="Liczba planowanych dób rejsowych"
                      required
                    />
                  )}
                />
              </>
            );
          }}
        />

        <form.Subscribe
          selector={(state) => state.values.cruiseHours}
          children={(cruiseHours) => {
            return (
              <>
                <form.Field
                  name="cruiseHours"
                  children={(field) => (
                    <AppNumberInput
                      name={field.name}
                      value={cruiseHours}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      onIncrement={() => field.handleChange(cruiseHours + 1)}
                      onDecrement={() => field.handleChange(cruiseHours - 1)}
                      onBlur={field.handleBlur}
                      errors={mapValidationErrors(field.state.meta.errors)}
                      label="Liczba planowanych godzin rejsowych"
                      required
                    />
                  )}
                />
              </>
            );
          }}
        />

        <form.Field
          name="periodNotes"
          children={(field) => (
            <div className="col-span-2">
              <AppInput
                name={field.name}
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                errors={mapValidationErrors(field.state.meta.errors)}
                label="Uwagi dotyczące teminu"
                placeholder='np. "Rejs w okresie wakacyjnym"'
              />
            </div>
          )}
        />

        <form.Field
          name="shipUsage"
          children={(field) => (
            <div className="col-span-2">
              <AppDropdownInput
                name="shipUsage"
                value={field.state.value.toString()}
                onChange={(e) => field.handleChange(Number(e))}
                onBlur={field.handleBlur}
                errors={mapValidationErrors(field.state.meta.errors)}
                label="Statek na potrzeby badań będzie wykorzystywany"
                allOptions={initialStateQuery.data?.shipUsages.map((shipUsage, i) => ({
                  value: i.toString(),
                  inlineLabel: shipUsage,
                  richLabel: <span>{shipUsage}</span>,
                }))}
              />
            </div>
          )}
        />

        <form.Subscribe selector={(state) => state.values.shipUsage}>
          {(shipUsage) => (
            <div className="col-span-2">
              <AnimatePresence>
                {shipUsage === 4 && (
                  <motion.div
                    initial={{ opacity: 0, translateY: '-10%' }}
                    animate={{ opacity: 1, translateY: '0' }}
                    exit={{ opacity: 0, translateY: '-10%' }}
                    transition={{ ease: 'easeOut', duration: 0.2 }}
                  >
                    <form.Field
                      name="differentShipUsage"
                      children={(field) => (
                        <div className="col-span-2">
                          <AppInput
                            name={field.name}
                            value={field.state.value}
                            onChange={field.handleChange}
                            onBlur={field.handleBlur}
                            errors={mapValidationErrors(field.state.meta.errors)}
                            label="Inny sposób użycia"
                            placeholder="np. statek badawczy"
                            required
                          />
                        </div>
                      )}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </form.Subscribe>
      </div>
    </AppAccordion>
  );
}
