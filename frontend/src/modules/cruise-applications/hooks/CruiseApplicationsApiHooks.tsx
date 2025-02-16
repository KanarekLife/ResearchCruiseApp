import { useSuspenseQuery } from '@tanstack/react-query';

import { client } from '@/core/lib/api';
import { CruiseApplication } from '@/cruise-applications/models/CruiseApplication';

export function useCruiseApplicationsQuery() {
  return useSuspenseQuery({
    queryKey: ['cruiseApplications'],
    queryFn: async () => {
      return client.get('/api/CruiseApplications');
    },
    select: (res) => res.data as CruiseApplication[],
  });
}

export function useCruiseApplicationQuery(id: string) {
  return useSuspenseQuery({
    queryKey: ['cruiseApplications', id],
    queryFn: async () => {
      return client.get(`/api/CruiseApplications/${id}`);
    },
    select: (res) => res.data as CruiseApplication,
  });
}
