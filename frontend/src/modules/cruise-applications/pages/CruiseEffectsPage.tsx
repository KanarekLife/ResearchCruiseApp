import { ColumnDef } from '@tanstack/react-table';
import { Suspense } from 'react';

import { AppLayout } from '@/core/components/AppLayout';
import { AppLink } from '@/core/components/AppLink';
import { AppLoader } from '@/core/components/AppLoader';
import { AppTable } from '@/core/components/table/AppTable';
import { useEffectsEvaluationsQuery } from '@/cruise-applications/hooks/CruiseApplicationsApiHooks';

import { ReadOnlyResearchTaskDetails } from '../components/application-details/research-task-details/ReadOnlyResearchTaskDetails';
import { getTaskName } from '../models/ResearchTaskDto';
import { ResearchTaskEffectDto } from '../models/ResearchTaskEffectDto';

export function CruiseEffectsPage() {
  const effectsQuery = useEffectsEvaluationsQuery();

  const columns: ColumnDef<ResearchTaskEffectDto>[] = [
    {
      header: 'Lp.',
      cell: ({ row }) => `${row.index + 1}`,
      size: 5,
    },
    {
      header: 'Zadanie',
      accessorFn: (row) => `${getTaskName(row.effect.type)}`,
      size: 20,
    },
    {
      header: 'Szczegóły',
      cell: ({ row }) => <ReadOnlyResearchTaskDetails data={row.original.effect} />,
    },
    {
      header: 'Punkty',
      accessorFn: (row) => row.points,
      size: 10,
    },
    {
      header: 'Formularz',
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <AppLink href={`/cruises/${row.original.id}/formC`}>Formularz C</AppLink>
        </div>
      ),
      size: 10,
    },
  ];

  return (
    <>
      <AppLayout title="Efekty rejsów">
        <Suspense fallback={<AppLoader />}>
          <AppTable data={effectsQuery.data} columns={columns} buttons={(defaultButtons) => [...defaultButtons]} />
        </Suspense>
      </AppLayout>
    </>
  );
}
