import { ReactFormExtendedApi } from '@tanstack/react-form';
import { Row } from '@tanstack/react-table';

import { FormAAuthorTitleTaskDetails } from '@/cruise-applications/components/research-task-details/FormAAuthorTitleTaskDetails';
import { FormADescriptionTaskDetails } from '@/cruise-applications/components/research-task-details/FormADescriptionTaskDetails';
import { FormAMinisterialPointsTaskDetails } from '@/cruise-applications/components/research-task-details/FormAMinistrialPointsTaskDetails';
import { FormATitleDateFinancingApprovedTaskDetails } from '@/cruise-applications/components/research-task-details/FormATitleDateFinancingApprovedTaskDetails';
import { FormATitleFinancingAmountSecuredAmountWithDatesTaskDetails } from '@/cruise-applications/components/research-task-details/FormATitleFinancingAmountSecuredAmountWithDatesTaskDetails';
import { FormADto, FormAResearchTask } from '@/cruise-applications/lib/types';

type Props = {
  type: string;
  form: ReactFormExtendedApi<FormADto, undefined>;
  row: Row<FormAResearchTask>;
};
export function FormAResearchTaskDetails({ type, form, row }: Props) {
  if (['0', '1', '2'].includes(type)) {
    return <FormAAuthorTitleTaskDetails form={form} row={row} />;
  }
  if (type === '3') {
    return <FormATitleDateFinancingApprovedTaskDetails form={form} row={row} />;
  }
  if (['4', '5', '6', '7', '8'].includes(type)) {
    return <FormATitleFinancingAmountSecuredAmountWithDatesTaskDetails form={form} row={row} />;
  }
  if (['9', '11'].includes(type)) {
    return <FormADescriptionTaskDetails form={form} row={row} />;
  }
  if (type === '10') {
    return <FormAMinisterialPointsTaskDetails form={form} row={row} />;
  }
  throw new Error(`Unknown task type: ${type}`);
}
