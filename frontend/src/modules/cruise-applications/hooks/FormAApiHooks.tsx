import { useSuspenseQuery } from '@tanstack/react-query';

import { client } from '@/core/lib/api';
import { FormADto } from '@/cruise-applications/models/FormADto';
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

export function useFormA(cruiseId: string) {
  return useSuspenseQuery({
    queryKey: ['formA', cruiseId],
    queryFn: async () => {
      return client.get(`/api/CruiseApplications/${cruiseId}/formA`);
    },
    select: (res) => res.data as FormADto,
  });
}
