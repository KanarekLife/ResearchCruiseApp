import { CruiseFormBasicInformation } from '@/cruise-schedule/components/cruise-from/CruiseFormBasicInformation';
import { CruiseFormProvider, CruiseFromContextType } from '@/cruise-schedule/contexts/CruiseFormContext';

type Props = {
  context: CruiseFromContextType;
};

export function CruiseFrom({ context }: Props) {
  return (
    <CruiseFormProvider value={context}>
      <CruiseFormBasicInformation />
    </CruiseFormProvider>
  );
}
