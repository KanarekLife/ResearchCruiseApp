import { ColumnDef } from '@tanstack/react-table';

import { Suspense } from 'react';
import { AppLayout } from '@/core/components/AppLayout';
import { AppLoader } from '@/core/components/AppLoader';
import { AppTable } from '@/core/components/table/AppTable';

import { CruiseApplication } from '../models/CruiseApplication';
import { useCruiseApplicationsQuery } from "../hooks/CruiseApplicationsApiHooks";

export function ApplicationsPage() {
  const applicationsQuery = useCruiseApplicationsQuery();

  const columns: ColumnDef<CruiseApplication>[] = [
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
      cell: ( {row} ) => (
        <>
          {row.original.hasFormA && <span><a href={`/cruises/${row.original.id}/formA`}>Formularz A</a></span>}
          {row.original.hasFormB && <span><a href={`/cruises/${row.original.id}/formB`}>Formularz B</a></span>}
          {row.original.hasFormC && <span><a href={`/cruises/${row.original.id}/formC`}>Formularz C</a></span>}
        </>
      )
    },
    {
      header: 'Punkty',
      accessorFn: (row) => `${row.points}`,
    },
    {
      header: 'Status',
      accessorFn: (row) => `${row.status}`,
    }
  ];

  return (
    <>
      <AppLayout title="Zgłoszenia">
        <Suspense fallback={<AppLoader />}>
          <AppTable
            data={applicationsQuery.data}
            columns={columns}
            buttons={(defaultButtons) => [
              ...defaultButtons,
            ]}
          />
        </Suspense>
      </AppLayout>
    </>
  );
};
