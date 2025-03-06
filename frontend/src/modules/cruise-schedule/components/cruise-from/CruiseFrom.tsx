import { CruiseFormBasicInformation } from '@/cruise-schedule/components/cruise-from/CruiseFormBasicInformation';
import { CruiseFormDateSelection } from '@/cruise-schedule/components/cruise-from/CruiseFormDateSelection';
import { CruiseFormManagerSelection } from '@/cruise-schedule/components/cruise-from/CruiseFormManagerSelection';
import { CruiseFormProvider, CruiseFromContextType } from '@/cruise-schedule/contexts/CruiseFormContext';

type Props = {
  context: CruiseFromContextType;
};

export function CruiseFrom({ context }: Props) {
  return (
    <CruiseFormProvider value={context}>
      <CruiseFormBasicInformation />
      <CruiseFormDateSelection />
      <CruiseFormManagerSelection />
    </CruiseFormProvider>
  );
}
