import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

import { AppAvatar } from '@/core/components/AppAvatar';
import { AppBadge } from '@/core/components/AppBadge';
import { AppButton } from '@/core/components/AppButton';
import { AppLink } from '@/core/components/AppLink';
import { AppTable } from '@/core/components/table/AppTable';
import { CruiseApplicationShortInfoDto } from '@/cruise-schedule/models/CruiseApplicationShortInfoDto';
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
      size: 10,
    },
    {
      header: 'Kierownik główny',
      accessorFn: (row) =>
        row.mainCruiseManagerId == emptyGuid
          ? 'Nie przypisano'
          : `${row.mainCruiseManagerFirstName} ${row.mainCruiseManagerLastName}`,
      cell: (cell) => (
        <MainCruiseManagerCell managerId={cell.row.original.mainCruiseManagerId} fullName={cell.getValue() as string} />
      ),
    },
    {
      header: 'Zgłoszenia',
      accessorFn: (row) => row.cruiseApplicationsShortInfo,
      cell: ({ row }) => <ApplicationsCell applications={row.original.cruiseApplicationsShortInfo} />,
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      id: 'actions',
      header: undefined,
      cell: ({ row }) => <ActionsCell cruiseId={row.original.id} deleteCruise={deleteCruise} />,
      size: 40,
    },
  ];
  return <AppTable columns={columns} data={cruises} />;
}

type MainCruiseManagerCellProps = {
  managerId: string;
  fullName: string;
};
function MainCruiseManagerCell({ managerId, fullName }: MainCruiseManagerCellProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {managerId != emptyGuid && <AppAvatar variant="small" fullName={fullName} />}
      <div>{fullName}</div>
    </div>
  );
}

type ActionsCellProps = {
  cruiseId: string;
  deleteCruise: (id: string) => void;
};
function ActionsCell({ cruiseId, deleteCruise }: ActionsCellProps) {
  return (
    <div className="grid grid-cols-1 gap-2 min-w-20">
      <AppLink href={`/cruises/${cruiseId}`}>
        <AppButton variant="primary" size="xs" className="w-full">
          Szczegóły
        </AppButton>
      </AppLink>
      <AppButton variant="dangerOutline" size="xs" onClick={() => deleteCruise(cruiseId)}>
        Usuń
      </AppButton>
    </div>
  );
}

type ApplicationsCellProps = {
  applications: CruiseApplicationShortInfoDto[];
};
function ApplicationsCell({ applications }: ApplicationsCellProps) {
  if (!applications || applications.length === 0) {
    return 'Brak zgłoszeń';
  }
  return (
    <div className="flex flex-col gap-4  text-balance">
      {applications.map((application) => (
        <div className="flex flex-col xl:flex-row items-center justify-between gap-2" key={application.id}>
          <div className="flex-2">
            <AppLink href={`/applications/${application.id}/details`}>
              Zgłoszenie nr. <span className="font-bold">{application.number}</span>
            </AppLink>
          </div>
          <div className="flex-1">
            <AppBadge>{application.points} pkt.</AppBadge>
          </div>
        </div>
      ))}
    </div>
  );
}
