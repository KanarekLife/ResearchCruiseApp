import { ColumnDef } from '@tanstack/react-table';
import { Suspense } from 'react';

import { AppLayout } from '@/core/components/AppLayout';
import { AppLink } from '@/core/components/AppLink';
import { AppLoader } from '@/core/components/AppLoader';
import { AppTable } from '@/core/components/table/AppTable';
import { useCruiseApplicationsQuery } from '@/cruise-applications/hooks/CruiseApplicationsApiHooks';
import { CruiseApplicationDto, CruiseApplicationStatus } from '@/cruise-applications/models/CruiseApplicationDto';
import { AppAvatar } from '@/core/components/AppAvatar';
import { AppButton } from '@/core/components/AppButton';
import { AppBadge } from '@/core/components/AppBadge';

export function ApplicationsPage() {
  const applicationsQuery = useCruiseApplicationsQuery();

  const columns: ColumnDef<CruiseApplicationDto>[] = [
    {
      header: 'Numer',
      accessorFn: (row) => `${row.number}`,
      sortDescFirst: true,
    },
    {
      header: 'Data',
      accessorFn: (row) => `${row.date}`,
    },
    {
      header: 'Rok rejsu',
      accessorFn: (row) => `${row.year}`,
    },
    {
      id: 'avatar',
      header: undefined,
      accessorFn: (row) => `${row.cruiseManagerFirstName} ${row.cruiseManagerLastName}`,
      cell: (cell) => <AppAvatar fullName={cell.getValue() as string} variant="small" />,
      enableColumnFilter: false,
      enableSorting: false,
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
      accessorFn: (row) => `${row.points} pkt.`,
      cell: ({ row }) => <AppBadge>{row.original.points} pkt.</AppBadge>,
    },
    {
      header: 'Status',
      accessorFn: (row) => `${row.status}`,
      cell: ({ row }) => <>
        <p className='italic'>{row.original.status}</p>
        {row.original.status === CruiseApplicationStatus.FormBRequired && <AppButton type='link' href={`/cruises/${row.original.id}/formB?mode=edit`}>Wypełnij</AppButton>}
      </>,
    },
    {
      header: 'Akcje',
      cell: ({ row }) => (
        <>
          <AppButton type='link' href={`/applications/${row.original.id}/details`}>Szczegóły</AppButton>
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
