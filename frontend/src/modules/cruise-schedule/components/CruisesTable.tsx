import { ColumnDef } from '@tanstack/react-table';

import { AppAvatar } from '@/core/components/AppAvatar';
import { AppBadge } from '@/core/components/AppBadge';
import { AppButton } from '@/core/components/AppButton';
import { AppTable } from '@/core/components/table/AppTable';
import { CruiseDto } from '@/cruise-schedule/models/CruiseDto';

const emptyGuid = '00000000-0000-0000-0000-000000000000';

const columns: ColumnDef<CruiseDto>[] = [
  {
    header: 'Numer',
    accessorFn: (row) => row.number,
  },
  {
    header: 'Czas trwania',
    cell: ({ row }) => (
      <>
        {row.original.startDate} - {row.original.endDate}
      </>
    ),
  },
  {
    header: 'Status',
    accessorFn: (row) => row.status,
    cell: ({ row }) => <AppBadge variant="primary">{row.original.status}</AppBadge>,
  },
  {
    header: 'Kierownik główny',
    accessorFn: (row) =>
      row.mainCruiseManagerId == emptyGuid
        ? 'Nie przypisano'
        : `${row.mainCruiseManagerFirstName} ${row.mainCruiseManagerLastName}`,
    cell: (cell) => (
      <div className="flex items-center justify-around">
        {cell.row.original.mainCruiseManagerId != emptyGuid && (
          <AppAvatar variant="small" fullName={cell.getValue() as string} />
        )}
        <div>{cell.getValue() as string}</div>
      </div>
    ),
  },
  {
    header: 'Zgłoszenia',
    accessorFn: (row) => row.cruiseApplicationsShortInfo,
    cell: ({ row }) => row.original.cruiseApplicationsShortInfo.length,
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    id: 'actions',
    header: undefined,
    cell: (cell) => (
      <div className="grid grid-cols-1 gap-2">
        <AppButton variant="primary" size="xs">
          Szczegóły
        </AppButton>
        <AppButton variant="dangerOutline" size="xs">
          Usuń
        </AppButton>
      </div>
    ),
  },
];

type Props = {
  cruises: CruiseDto[];
};
export function CruisesTable({ cruises }: Props) {
  return <AppTable columns={columns} data={cruises} />;
}
