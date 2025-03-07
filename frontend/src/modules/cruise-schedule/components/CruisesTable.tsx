import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

import { AppAvatar } from '@/core/components/AppAvatar';
import { AppBadge } from '@/core/components/AppBadge';
import { AppButton } from '@/core/components/AppButton';
import { AppTable } from '@/core/components/table/AppTable';
import { CruiseStatusBadge } from '@/cruise-schedule/components/CruiseStatusBadge';
import { CruiseApplicationShortInfoDto, CruiseDto } from '@/cruise-schedule/models/CruiseDto';

const emptyGuid = '00000000-0000-0000-0000-000000000000';
const dateFormat = 'DD.MM.YYYY, HH:mm';

type Props = {
  cruises: CruiseDto[];
  deleteCruise: (cruise: CruiseDto) => void;
  buttons: React.ReactNode[];
};
export function CruisesTable({ cruises, deleteCruise, buttons }: Props) {
  const columns: ColumnDef<CruiseDto>[] = [
    {
      header: 'Numer',
      id: 'number',
      accessorFn: (row) => row.number,
      sortingFn: (a, b) => compareCruiseNumber(a.original.number, b.original.number),
      cell: (cell) => <span className="font-bold">{cell.getValue() as string}</span>,
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
      cell: ({ row }) => <ActionsCell cruise={row.original} deleteCruise={deleteCruise} />,
      size: 100,
    },
  ];
  return (
    <AppTable
      columns={columns}
      data={cruises}
      buttons={(predefinedButtons) => buttons.concat(predefinedButtons)}
      initialSortingState={[
        {
          id: 'number',
          desc: true,
        },
      ]}
    />
  );
}

type MainCruiseManagerCellProps = {
  managerId: string;
  fullName: string;
};
function MainCruiseManagerCell({ managerId, fullName }: MainCruiseManagerCellProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {managerId !== emptyGuid && (
        <>
          <AppAvatar variant="small" fullName={fullName} /> <div>{fullName}</div>
        </>
      )}
      {managerId === emptyGuid && <AppBadge variant="info">{fullName}</AppBadge>}
    </div>
  );
}

type ApplicationsCellProps = {
  applications: CruiseApplicationShortInfoDto[];
};
function ApplicationsCell({ applications }: ApplicationsCellProps) {
  if (!applications || applications.length === 0) {
    return <AppBadge variant="info">Brak zgłoszeń</AppBadge>;
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
  cruise: CruiseDto;
  deleteCruise: (CruiseDto: CruiseDto) => void;
};
function ActionsCell({ cruise, deleteCruise }: ActionsCellProps) {
  return (
    <div className="grid grid-cols-1 gap-2 min-w-30">
      <AppButton type="link" href={`/cruises/${cruise.id}`}>
        Szczegóły
      </AppButton>
      {cruise.status === 'Nowy' && (
        <AppButton variant="dangerOutline" onClick={() => deleteCruise(cruise)}>
          Usuń
        </AppButton>
      )}
    </div>
  );
}

function compareCruiseNumber(a: string, b: string) {
  const [aYear, aNumber] = a.split('/').map(Number);
  const [bYear, bNumber] = b.split('/').map(Number);

  if (aYear !== bYear) {
    return aYear - bYear;
  }
  return aNumber - bNumber;
}
