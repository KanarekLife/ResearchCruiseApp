import { useSuspenseQuery } from '@tanstack/react-query';

import { client } from '@/core/lib/api';
import { FormAInitValuesDto } from '@/cruise-applications/models/FormAInitValuesDto';

export function useFormAInitValues() {
  return useSuspenseQuery({
    queryKey: ['formAInitValues'],
    queryFn: async () => {
      return client.get('/forms/InitValues/A');
    },
    select: (res) => res.data as FormAInitValuesDto,
  });
}
