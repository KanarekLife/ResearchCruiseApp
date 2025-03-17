import { ColumnDef } from '@tanstack/react-table';
import { Suspense } from 'react';
import ZoomInIcon from 'bootstrap-icons/icons/zoom-in.svg?react';

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
      id: 'number',
      header: 'Numer',
      accessorFn: (row) => `${row.number}`,
      sortDescFirst: true,
    },
    {
      id: 'date',
      header: 'Data',
      accessorFn: (row) => `${row.date}`,
    },
    {
      id: 'year',
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
      size: 40,
    },
    {
      id: 'manager',
      header: 'Kierownik',
      accessorFn: (row) => `${row.cruiseManagerFirstName} ${row.cruiseManagerLastName}`,
    },
    {
      id: 'forms',
      header: 'Formularze',
      cell: ({ row }) => {
        const isFormBReadOnly = row.original.status === CruiseApplicationStatus.Accepted;
        return (
        <div className="flex flex-col gap-1">
          <AppLink disabled={!row.original.hasFormA} href={`/applications/${row.original.id}/formA`}>
            Formularz A
          </AppLink>
          <AppLink disabled={!row.original.hasFormB} href={`/applications/${row.original.id}/formB?mode=${isFormBReadOnly ? 'view' : 'preview'}`}>
            Formularz B
          </AppLink>
          <AppLink disabled={!row.original.hasFormC} href={`/applications/${row.original.id}/formC`}>
            Formularz C
          </AppLink>
        </div>
      );},
    },
    {
      id: 'points',
      header: 'Punkty',
      accessorFn: (row) => `${row.points} pkt.`,
      cell: ({ row }) => <AppBadge>{row.original.points} pkt.</AppBadge>,
    },
    {
      id: 'status',
      header: 'Status',
      accessorFn: (row) => `${row.status}`,
      cell: ({ row }) => (
        <>
          <p className="italic">{row.original.status}</p>
          {row.original.status === CruiseApplicationStatus.FormBRequired && (
            <AppButton size="plain" type="link" href={`/cruises/${row.original.id}/formB?mode=edit`}>
              Wypełnij
            </AppButton>
          )}
          {row.original.status === CruiseApplicationStatus.Undertaken && (
            <>
              <AppButton size="plain" type="link" href={`/cruises/${row.original.id}/formC?mode=edit`}>
                Wypełnij formularz C
              </AppButton>
              <AppBadge variant="success">{row.original.effectsDoneRate} efektów</AppBadge>
            </>
          )}
        </>
      ),
      size: 165,
    },
    {
      id: 'actions',
      header: 'Akcje',
      cell: ({ row }) => (
        <>
          <AppButton type="link" href={`/applications/${row.original.id}/details`}>
            Szczegóły
            <ZoomInIcon className="w-4 h-4" />
          </AppButton>
        </>
      ),
    },
  ];

  const initialSortingState = [
    {
      id: 'number',
      desc: true,
    },
  ];

  return (
    <>
      <AppLayout title="Zgłoszenia">
        <Suspense fallback={<AppLoader />}>
          <AppTable
            data={applicationsQuery.data}
            columns={columns}
            buttons={(defaultButtons) => [...defaultButtons]}
            initialSortingState={initialSortingState}
          />
        </Suspense>
      </AppLayout>
    </>
  );
}
