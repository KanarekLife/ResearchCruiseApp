import FloppyFillIcon from 'bootstrap-icons/icons/floppy-fill.svg?react';
import SendFillIcon from 'bootstrap-icons/icons/send-fill.svg?react';

import { AppActionsSection } from '@/core/components/AppActionsSection';
import { AppButton } from '@/core/components/AppButton';
import { useFormC } from '@/cruise-applications/contexts/FormCContext';

type Props = {
  onSaveDraft: () => void;
};
export function FormCActionsSection({ onSaveDraft }: Props) {
  const { isReadonly } = useFormC();

  return (
    <AppActionsSection>
      {!isReadonly && (
        <AppButton className="gap-4 !justify-center w-36 lg:w-48" variant="primaryOutline" onClick={onSaveDraft}>
          <FloppyFillIcon className="h-4 w-4" />
          Zapisz
        </AppButton>
      )}
      {!isReadonly && (
        <AppButton type="submit" className="gap-4 !justify-center w-36 lg:w-48">
          <SendFillIcon className="h-4 w-4" />
          Wyślij
        </AppButton>
      )}
    </AppActionsSection>
  );
}
