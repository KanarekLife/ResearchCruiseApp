import { AppAccordion } from '@/core/components/AppAccordion';
import { useFormB } from '@/cruise-applications/contexts/FormBContext';

export function FormBResearchAreaSection() {
  const { formA, formAInitValues } = useFormB();

  const researchArea = formAInitValues.researchAreas.find((area) => area.id === formA.researchAreaId)?.name;

  function getDescription() {
    if (formA.researchAreaInfo.length === 0) {
      return 'N/A';
    }

    return formA.researchAreaInfo;
  }

  return (
    <AppAccordion title="5. Rejon prowadzanego badań" expandedByDefault>
      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-2">
        <div>Obszar prowadzonych badań:</div>
        <div className="font-semibold">{researchArea}</div>
        <div className="mt-4 md:mt-0">Opis:</div>
        <div className="font-semibold">{getDescription()}</div>
      </div>
    </AppAccordion>
  );
}
