import { AppAccordion } from '@/core/components/AppAccordion';
import { AppAvatar } from '@/core/components/AppAvatar';
import { AppDropdownInput, AppDropdownInputOption } from '@/core/components/inputs/AppDropdownInput';
import { mapValidationErrors } from '@/core/lib/utils';
import { FormAProps } from '@/cruise-applications/components/formA/FormASectionProps';
import { FormUserDto } from '@/cruise-applications/models/FormUserDto';

function mapPersonToLabel(person: FormUserDto): AppDropdownInputOption<string> {
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

export function FormACruiseManagerInfoSection({ initValues, form, readonly }: FormAProps) {
  return (
    <AppAccordion title="1. Kierownik zgłaszanego rejsu" expandedByDefault>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <form.Field
          name="cruiseManagerId"
          children={(field) => (
            <AppDropdownInput
              name={field.name}
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={mapValidationErrors(field.state.meta.errors)}
              label="Kierownik rejsu"
              required
              placeholder="Wybierz kierownika rejsu"
              allOptions={initValues.data.cruiseManagers.map(mapPersonToLabel)}
              disabled={readonly}
            />
          )}
        />

        <form.Field
          name="deputyManagerId"
          children={(field) => (
            <AppDropdownInput
              name={field.name}
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={mapValidationErrors(field.state.meta.errors)}
              label="Zastępca kierownika rejsu"
              placeholder="Wybierz zastępcę kierownika rejsu"
              allOptions={initValues.data.deputyManagers.map(mapPersonToLabel)}
              disabled={readonly}
            />
          )}
        />

        <form.Field
          name="year"
          children={(field) => (
            <AppDropdownInput
              name={field.name}
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={mapValidationErrors(field.state.meta.errors)}
              label="Rok"
              required
              placeholder="Wybierz rok"
              allOptions={initValues.data.years.map((year) => ({
                value: year,
                inlineLabel: year,
              }))}
              disabled={readonly}
            />
          )}
        />
      </div>
    </AppAccordion>
  );
}
