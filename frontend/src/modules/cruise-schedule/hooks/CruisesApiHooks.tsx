import { useSuspenseQuery } from '@tanstack/react-query';

import { client } from '@/core/lib/api';
import { CruiseDto } from '@/cruise-schedule/models/CruiseDto';

export function useCruisesQuery() {
  return useSuspenseQuery({
    queryKey: ['cruises'],
    queryFn: async () => {
      return client.get('/api/Cruises');
    },
    select: (res) => res.data as CruiseDto[],
  });
}
