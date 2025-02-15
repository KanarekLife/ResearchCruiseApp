import TrashIcon from 'bootstrap-icons/icons/trash.svg?react';

import { AppButton } from '@/core/components/AppButton';

type Props = {
  onClick: () => void;
};
export function AppTableDeleteRowButton({ onClick }: Props) {
  return (
    <AppButton variant="dangerOutline" size="square" onClick={onClick} title="Usuń wiersz">
      <TrashIcon className="h-5 w-5" />
    </AppButton>
  );
}
