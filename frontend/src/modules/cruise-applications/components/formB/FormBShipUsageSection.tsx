import { AppAccordion } from '@/core/components/AppAccordion';
import { useFormB } from '@/cruise-applications/contexts/FormBContext';

export function FormBShipUsageSection() {
  const { formA, formAInitValues } = useFormB();

  const predefinedUsage = formAInitValues.shipUsages.at(parseInt(formA.shipUsage ?? '0'));

  function getDifferentUsage() {
    if (formA.differentUsage !== '4' || formA.differentUsage.length === 0) {
      return 'N/A';
    }

    return formA.differentUsage;
  }

  return (
    <AppAccordion title="3. Sposób wykorzystania statku" expandedByDefault>
      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-2">
        <div className="font-semibold">Statek na potrzeby badań będzie wykorzystywany:</div>
        <div>{predefinedUsage}</div>
        <div className="font-semibold">Inny sposób użycia:</div>
        <div>{getDifferentUsage()}</div>
      </div>
    </AppAccordion>
  );
}
