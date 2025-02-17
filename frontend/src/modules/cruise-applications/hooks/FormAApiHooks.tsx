import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { client } from '@/core/lib/api';
import { FormADto } from '@/cruise-applications/models/FormADto';
import { FormAInitValuesDto } from '@/cruise-applications/models/FormAInitValuesDto';

export function useFormAInitValuesQuery() {
  return useSuspenseQuery({
    queryKey: ['formAInitValues'],
    queryFn: async () => {
      return client.get('/forms/InitValues/A');
    },
    select: (res) => res.data as FormAInitValuesDto,
  });
}

export function useFormAQuery(cruiseId: string) {
  return useSuspenseQuery({
    queryKey: ['formA', cruiseId],
    queryFn: async () => {
      return client.get(`/api/CruiseApplications/${cruiseId}/formA`);
    },
    select: (res) => res.data as FormADto,
  });
}

type SaveFormADraftProps = {
  form: FormADto;
};
export function useSaveFormADraftMutation() {
  return useMutation({
    mutationFn: async ({ form }: SaveFormADraftProps) => {
      return client.post('/api/CruiseApplications?isDraft=true', form);
    },
  });
}
