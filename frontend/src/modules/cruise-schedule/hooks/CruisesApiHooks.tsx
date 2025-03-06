import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

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

export function useCruiseQuery(id: string) {
  return useSuspenseQuery({
    queryKey: ['cruises', id],
    queryFn: async () => {
      return client.get(`/api/Cruises/${id}`);
    },
    select: (res) => res.data as CruiseDto,
  });
}

export function useCruiseApplicationsForCruiseQuery() {
  return useSuspenseQuery({
    queryKey: ['cruiseApplications', 'forCruise'],
    queryFn: async () => {
      return client.get('/api/CruiseApplications/forCruise');
    },
    select: (res) => res.data,
  });
}

export function useDeleteCruiseMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await client.delete(`/api/Cruises/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cruises'] });
    },
  });
}

export function useAutoAddCruisesMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await client.put('/api/Cruises/autoAdded');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cruises'] });
    },
  });
}
