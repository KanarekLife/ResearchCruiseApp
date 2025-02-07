import { ReactFormExtendedApi } from '@tanstack/react-form';
import { UseSuspenseQueryResult } from '@tanstack/react-query';

import { AppAccordion } from '@/core/components/AppAccordion';
import { AppAvatar } from '@/core/components/AppAvatar';
import { AppDropdownInput } from '@/core/components/inputs/AppDropdownInput';
import { mapValidationErrors } from '@/core/lib/utils';
import { FormADto, FormAInitialState, FormAPerson } from '@/formA/lib/types';

type Props = {
  initialStateQuery: UseSuspenseQueryResult<FormAInitialState, Error>;
  form: ReactFormExtendedApi<FormADto, undefined>;
};

function mapPersonToLabel(person: FormAPerson): {
  value: string;
  inlineLabel: React.ReactNode;
  richLabel?: React.ReactNode;
} {
  return {
    value: person.id,
    inlineLabel: `${person.firstName} ${person.lastName} (${person.email})`,
    richLabel: (
      <div className="w-full flex gap-4">
        <AppAvatar fullName={`${person.firstName} ${person.lastName}`} variant="small" />
        <div className="flex flex-col justify-center flex-1">
          <div className="font-semibold">
            {person.firstName} {person.lastName}
          </div>
          <div>{person.email}</div>
        </div>
      </div>
    ),
  };
}

export function FormACruiseManagerInfoSection({ initialStateQuery, form }: Props) {
  return (
    <AppAccordion title="1. Kierownik zgłaszanego rejsu" expandedByDefault>
      <div className="grid grid-cols-3 gap-4">
        <form.Field
          name="cruiseManagerId"
          children={(field) => (
            <AppDropdownInput
              name="cruiseManagerId"
              value={field.state.value}
              onChange={(e) => field.handleChange(e as string)}
              onBlur={field.handleBlur}
              errors={mapValidationErrors(field.state.meta.errors)}
              label="Kierownik rejsu"
              allOptions={initialStateQuery.data?.cruiseManagers.map(mapPersonToLabel)}
            />
          )}
        />
        <form.Field
          name="deputyManagerId"
          children={(field) => (
            <AppDropdownInput
              name="deputyManagerId"
              value={field.state.value}
              onChange={(e) => field.handleChange(e as string)}
              onBlur={field.handleBlur}
              errors={mapValidationErrors(field.state.meta.errors)}
              label="Kierownik rejsu"
              allOptions={initialStateQuery.data?.cruiseManagers.map(mapPersonToLabel)}
            />
          )}
        />
        <form.Field
          name="year"
          children={(field) => (
            <AppDropdownInput
              name="year"
              value={field.state.value}
              onChange={(e) => field.handleChange(e as string)}
              onBlur={field.handleBlur}
              errors={mapValidationErrors(field.state.meta.errors)}
              label="Rok"
              allOptions={initialStateQuery.data?.years.map((year) => ({ value: year, inlineLabel: year }))}
              showEmptyOption={false}
            />
          )}
        />
      </div>
    </AppAccordion>
  );
}
