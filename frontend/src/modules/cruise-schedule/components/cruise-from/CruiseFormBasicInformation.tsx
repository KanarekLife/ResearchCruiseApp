import { AppAccordion } from '@/core/components/AppAccordion';
import { AppAlert } from '@/core/components/AppAlert';
import { CruiseStatusBadge } from '@/cruise-schedule/components/CruiseStatusBadge';
import { useCruiseForm } from '@/cruise-schedule/contexts/CruiseFormContext';

export function CruiseFormBasicInformation() {
  const { cruise } = useCruiseForm();

  return (
    <AppAccordion title="1. Podstawowe informacje o rejsie" expandedByDefault>
      <div className="mt-4">
        {cruise && (
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <div className="font-bold">Numer rejsu:</div>
              <div>{cruise.number}</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-bold">Status:</div>
              <div>
                <CruiseStatusBadge status={cruise.status} />
              </div>
            </div>
          </div>
        )}
        {!cruise && <AppAlert>Numer i status rejsu będą dostępne po jego utworzeniu</AppAlert>}
      </div>
    </AppAccordion>
  );
}
