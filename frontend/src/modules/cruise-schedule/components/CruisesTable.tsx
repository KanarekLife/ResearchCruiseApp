import { CellContext, ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

import { AppAvatar } from '@/core/components/AppAvatar';
import { AppBadge } from '@/core/components/AppBadge';
import { AppButton } from '@/core/components/AppButton';
import { AppLink } from '@/core/components/AppLink';
import { AppTable } from '@/core/components/table/AppTable';
import { CruiseDto } from '@/cruise-schedule/models/CruiseDto';

const emptyGuid = '00000000-0000-0000-0000-000000000000';
const dateFormat = 'DD.MM.YYYY, HH:mm';

type Props = {
  cruises: CruiseDto[];
  deleteCruise: (id: string) => void;
};
export function CruisesTable({ cruises, deleteCruise }: Props) {
  const columns: ColumnDef<CruiseDto>[] = [
    {
      header: 'Numer',
      accessorFn: (row) => row.number,
    },
    {
      header: 'Czas trwania',
      cell: ({ row }) => (
        <div className="flex flex-col items-center justify-around">
          <p>Od {dayjs(row.original.startDate).format(dateFormat)}</p>
          <p>Do {dayjs(row.original.endDate).format(dateFormat)}</p>
        </div>
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
      cell: (cell) => <MainCruiseManagerCell cell={cell} />,
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
      cell: (cell) => <ActionsCell cell={cell} deleteCruise={deleteCruise} />,
      size: 40,
    },
  ];
  return <AppTable columns={columns} data={cruises} />;
}

type MainCruiseManagerCellProps = {
  cell: CellContext<CruiseDto, unknown>;
};
function MainCruiseManagerCell({ cell }: MainCruiseManagerCellProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {cell.row.original.mainCruiseManagerId != emptyGuid && (
        <AppAvatar variant="small" fullName={cell.getValue() as string} />
      )}
      <div>{cell.getValue() as string}</div>
    </div>
  );
}

type ActionsCellProps = {
  cell: CellContext<CruiseDto, unknown>;
  deleteCruise: (id: string) => void;
};
function ActionsCell({ cell, deleteCruise }: ActionsCellProps) {
  return (
    <div className="grid grid-cols-1 gap-2 min-w-20">
      <AppLink href={`/cruises/${cell.row.original.id}/details`}>
        <AppButton variant="primary" size="xs" className="w-full">
          Szczegóły
        </AppButton>
      </AppLink>
      <AppButton variant="dangerOutline" size="xs" onClick={() => deleteCruise(cell.row.original.id)}>
        Usuń
      </AppButton>
    </div>
  );
}
