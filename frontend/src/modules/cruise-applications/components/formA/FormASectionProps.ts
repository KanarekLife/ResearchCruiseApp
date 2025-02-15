import { ReactFormExtendedApi } from '@tanstack/react-form';
import { UseSuspenseQueryResult } from '@tanstack/react-query';

import { FormADto } from '@/cruise-applications/models/FormADto';
import { FormAInitValuesDto } from '@/cruise-applications/models/FormAInitValuesDto';

export type FormASectionProps = {
  initValues: UseSuspenseQueryResult<FormAInitValuesDto, Error>;
  form: ReactFormExtendedApi<FormADto, undefined>;
};
