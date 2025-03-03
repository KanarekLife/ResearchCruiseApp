import { AppAccordion } from '@/core/components/AppAccordion';
import { useFormB } from '@/cruise-applications/contexts/FormBContext';

export function FormBCruiseGoalSection() {
  const { formA, formAInitValues } = useFormB();

  const cruiseGoal = formAInitValues.cruiseGoals.find((_, index) => index === parseInt(formA.cruiseGoal));

  function getDescription() {
    if (formA.cruiseGoalDescription.length === 0) {
      return 'N/A';
    }

    return formA.cruiseGoalDescription;
  }

  return (
    <AppAccordion title="6. Cel rejsu" expandedByDefault>
      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-2">
        <div>Cel rejsu:</div>
        <div className="font-semibold">{cruiseGoal}</div>
        <div>Opis:</div>
        <div className="font-semibold">{getDescription()}</div>
      </div>
    </AppAccordion>
  );
}
