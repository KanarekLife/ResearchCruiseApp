import { AppAccordion } from '@/core/components/AppAccordion';
import { AppCheckbox } from '@/core/components/inputs/AppCheckbox';
import { getErrors } from '@/core/lib/utils';
import { useFormB } from '@/cruise-applications/contexts/FormBContext';
import { FormUserDto } from '@/cruise-applications/models/FormUserDto';

export function FormBCruiseManagerInfoSection() {
  const { form, formA, formAInitValues, hasFormBeenSubmitted, isReadonly } = useFormB();

  const cruiseManager = formAInitValues.cruiseManagers.find(
    (cruiseManager) => cruiseManager.id === formA.cruiseManagerId
  );
  const deputyManager = formAInitValues.deputyManagers.find(
    (deputyManager) => deputyManager.id === formA.deputyManagerId
  );

  function getFormUserName(user: FormUserDto | undefined): string | undefined {
    if (!user) {
      return undefined;
    }

    return `${user.firstName} ${user.lastName} (${user.email})`;
  }

  return (
    <AppAccordion title="2. Kierownik zgłaszanego rejsu" expandedByDefault>
      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-2">
        <div className="font-semibold">Kierownik rejsu:</div>
        <div>{getFormUserName(cruiseManager)}</div>
        <div className="font-semibold mt-4 md:mt-0">Zastępca:</div>
        <div>{getFormUserName(deputyManager)}</div>
        <div className="font-semibold">Czy kierownik jest obecny na rejsie?</div>
        <form.Field
          name="isCruiseManagerPresent"
          children={(field) => (
            <AppCheckbox
              size="md"
              name={field.name}
              checked={field.state.value === 'true'}
              onChange={(value) => field.handleChange(value ? 'true' : 'false')}
              onBlur={field.handleBlur}
              errors={getErrors(field.state.meta, hasFormBeenSubmitted)}
              disabled={isReadonly}
            />
          )}
        />
      </div>
    </AppAccordion>
  );
}
