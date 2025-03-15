import { ColumnDef } from '@tanstack/react-table';
import { Suspense } from 'react';

import { AppLayout } from '@/core/components/AppLayout';
import { AppLink } from '@/core/components/AppLink';
import { AppLoader } from '@/core/components/AppLoader';
import { AppTable } from '@/core/components/table/AppTable';
import { useCruiseApplicationsQuery } from '@/cruise-applications/hooks/CruiseApplicationsApiHooks';
import { CruiseApplicationDto } from '@/cruise-applications/models/CruiseApplicationDto';

export function ApplicationsPage() {
  const applicationsQuery = useCruiseApplicationsQuery();

  const columns: ColumnDef<CruiseApplicationDto>[] = [
    {
      header: 'Numer/data',
      accessorFn: (row) => `${row.number}/${row.date}`,
    },
    {
      header: 'Rok rejsu',
      accessorFn: (row) => `${row.year}`,
    },
    {
      header: 'Kierownik',
      accessorFn: (row) => `${row.cruiseManagerFirstName} ${row.cruiseManagerLastName}`,
    },
    {
      header: 'Formularze',
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <AppLink disabled={!row.original.hasFormA} href={`/applications/${row.original.id}/formA`}>
            Formularz A
          </AppLink>
          <AppLink disabled={!row.original.hasFormB} href={`/applications/${row.original.id}/formB`}>
            Formularz B
          </AppLink>
          <AppLink disabled={!row.original.hasFormC} href={`/applications/${row.original.id}/formC`}>
            Formularz C
          </AppLink>
        </div>
      ),
    },
    {
      header: 'Punkty',
      accessorFn: (row) => `${row.points}`,
    },
    {
      header: 'Status',
      accessorFn: (row) => `${row.status}`,
    },
    {
      header: 'Akcje',
      cell: ({ row }) => (
        <>
          <AppLink href={`/applications/${row.original.id}/details`}>Szczegóły</AppLink>
        </>
      ),
    },
  ];

  return (
    <>
      <AppLayout title="Zgłoszenia">
        <Suspense fallback={<AppLoader />}>
          <AppTable data={applicationsQuery.data} columns={columns} buttons={(defaultButtons) => [...defaultButtons]} />
        </Suspense>
      </AppLayout>
    </>
  );
}
