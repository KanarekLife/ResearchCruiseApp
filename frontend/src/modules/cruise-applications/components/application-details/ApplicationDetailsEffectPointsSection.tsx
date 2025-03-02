import { AppAccordion } from '@/core/components/AppAccordion';
import { AppInput } from '@/core/components/inputs/AppInput';

export function ApplicationDetailsEffectPointsSection({ effectPoints }: { effectPoints: string }) {

  return (
    <AppAccordion title="3. Efekty osiągnięte po poprzednich rejsach" expandedByDefault>
      <div>
        <AppInput
          name="effectPoints"
          value={effectPoints}
          label="Liczba punktów przyznanych za zrealizowane efekty rejsów zgłoszone do momentu wysłania Formularza A:"
          disabled={true}
        />
      </div>
    </AppAccordion>
  );
}
