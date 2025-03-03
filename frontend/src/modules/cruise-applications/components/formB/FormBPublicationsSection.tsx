import { ColumnDef } from '@tanstack/react-table';

import { AppAccordion } from '@/core/components/AppAccordion';
import { AppTable } from '@/core/components/table/AppTable';
import { useFormB } from '@/cruise-applications/contexts/FormBContext';
import { getPublicationCategoryLabel, PublicationDto } from '@/cruise-applications/models/PublicationDto';

export function FormBPublicationsSection() {
  const { formA } = useFormB();

  const columns: ColumnDef<PublicationDto>[] = [
    {
      header: 'Lp.',
      cell: ({ row }) => `${row.index + 1}. `,
      size: 10,
    },
    {
      header: 'Kategoria',
      accessorFn: (row) => getPublicationCategoryLabel(row.category),
      enableColumnFilter: false,
      enableSorting: false,
      size: 10,
    },
    {
      header: 'Informacje',
      accessorFn: (row) => `${row.doi}, ${row.authors}, ${row.title}, ${row.magazine}`,
      enableColumnFilter: false,
      enableSorting: false,
      cell: ({ row }) => (
        <div className="grid grid-cols-2 gap-x-4 min-w-80 md:min-w-0 md:text-left md:gap-0 md:mx-32">
          <div className="font-semibold">DOI:</div>
          <div className="text-center">{row.original.doi}</div>
          <div className="font-semibold">Autorzy:</div>
          <div className="text-center">{row.original.authors}</div>
          <div className="font-semibold">Tytuł:</div>
          <div className="text-center">{row.original.title}</div>
          <div className="font-semibold">Czasopismo:</div>
          <div className="text-center">{row.original.magazine}</div>
        </div>
      ),
      size: 40,
    },
    {
      header: 'Rok wydania',
      accessorFn: (row) => {
        if (row.year === '0') {
          return 1900;
        } else {
          return parseInt(row.year);
        }
      },
      enableColumnFilter: false,
      enableSorting: false,
      size: 10,
    },
    {
      header: 'Punkty ministerialne',
      accessorFn: (row) => row.ministerialPoints,
      enableColumnFilter: false,
      enableSorting: false,
      size: 10,
    },
  ];

  return (
    <AppAccordion title="10. Publikacje" expandedByDefault>
      <div>
        <AppTable
          data={formA.publications}
          buttons={() => []}
          columns={columns}
          emptyTableMessage="Nie dodano żadnej publikacji."
        />
      </div>
    </AppAccordion>
  );
}
