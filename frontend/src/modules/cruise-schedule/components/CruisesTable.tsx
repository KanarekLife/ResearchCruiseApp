import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

import { AppAvatar } from '@/core/components/AppAvatar';
import { AppBadge } from '@/core/components/AppBadge';
import { AppButton } from '@/core/components/AppButton';
import { AppTable } from '@/core/components/table/AppTable';
import { CruiseStatusBadge } from '@/cruise-schedule/components/CruiseStatusBadge';
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
      header: 'Data rozpoczęcia',
      accessorFn: (row) => row.startDate,
      cell: (cell) => dayjs(cell.getValue() as string).format(dateFormat),
      enableColumnFilter: false,
    },
    {
      header: 'Data zakończenia',
      accessorFn: (row) => row.endDate,
      cell: (cell) => dayjs(cell.getValue() as string).format(dateFormat),
      enableColumnFilter: false,
    },
    {
      header: 'Status',
      accessorFn: (row) => row.status,
      cell: ({ row }) => <CruiseStatusBadge status={row.original.status} />,
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
      cell: ({ row }) => <ApplicationsCell applications={row.original.cruiseApplicationsShortInfo} />,
      size: 200,
    },
    {
      id: 'actions',
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
        <div className="flex flex-col gap-2" key={application.id}>
          <AppButton type="link" href={`/applications/${application.id}/details`} variant="primaryOutline" size="sm">
            <div className="flex items-center justify-around gap-2 w-full">
              <div>Zgłoszenie nr.{application.number}</div> <AppBadge>{application.points} pkt.</AppBadge>
            </div>
          </AppButton>
        </div>
      ))}
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
      <AppButton type="link" href={`/cruises/${cruiseId}`} variant="primary" className="w-full">
        Szczegóły
      </AppButton>
      <AppButton variant="dangerOutline" onClick={() => deleteCruise(cruiseId)}>
        Usuń
      </AppButton>
    </div>
  );
}
