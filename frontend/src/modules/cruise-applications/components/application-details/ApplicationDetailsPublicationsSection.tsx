import { ColumnDef } from '@tanstack/react-table';

import { AppAccordion } from '@/core/components/AppAccordion';
import { AppTable } from '@/core/components/table/AppTable';
import { FormAPublication } from '@/cruise-applications/models/EvaluationDto';
import { AppYearPickerInput } from '@/core/components/inputs/dates/AppYearPickerInput';
import { AppInput } from '@/core/components/inputs/AppInput';
import { AppNumberInput } from '@/core/components/inputs/AppNumberInput';

const name = {
  subject: 'Temat',
  postscript: 'Dopisek',
};

export function ApplicationDetailsPublicationsSection({ publications }: { publications: FormAPublication[] }) {

  const columns: ColumnDef<FormAPublication>[] = [
    {
      header: 'Lp.',
      cell: ({ row }) => `${row.index + 1}. `,
      size: 20,
    },
    {
      header: 'Kategoria',
      accessorFn: (row) => row.publication.category,
      enableColumnFilter: false,
      enableSorting: false,
      cell: ({ row }) => (
        <div>{name[row.original.publication.category]}</div>
      ),
      size: 100,
    },
    {
      header: 'Informacje',
      accessorFn: (row) => `${row.publication.doi}, ${row.publication.authors}, ${row.publication.title}, ${row.publication.magazine}`,
      enableColumnFilter: false,
      enableSorting: false,
      cell: ({ row }) => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AppInput
            name={`publications[${row.index}].publication.doi`}
            value={row.original.publication.doi}
            label="DOI"
            required
            disabled
          />
          <AppInput
            name={`publications[${row.index}].publication.authors`}
            value={row.original.publication.authors}
            label="Autorzy"
            required
            disabled
          />
          <AppInput
            name={`publications[${row.index}].publication.title`}
            value={row.original.publication.title}
            label="Tytuł"
            required
            disabled
          />
          <AppInput
            name={`publications[${row.index}].publication.magazine`}
            value={row.original.publication.magazine}
            label="Czasopismo"
            required
            disabled
          />
        </div>
      ),
    },
    {
      header: 'Rok wydania',
      accessorFn: (row) => parseInt(row.publication.year),
      enableColumnFilter: false,
      enableSorting: false,
      cell: ({ row }) => (
        <AppYearPickerInput
          name={`publications[${row.index}].publication.year`}
          value={parseInt(row.original.publication.year)}
          required
          disabled
        />
      ),
      size: 80,
    },
    {
      header: 'Punkty ministerialne',
      accessorFn: (row) => row.publication.ministerialPoints,
      enableColumnFilter: false,
      enableSorting: false,
      cell: ({ row }) => (
        <AppNumberInput
          name={`publications[${row.index}].publication.ministerialPoints`}
          value={parseInt(row.original.publication.ministerialPoints)}
          minimum={0}
          required
          disabled
        />
      ),
      size: 80,
    },
    {
      header: 'Punkty',
      accessorFn: (row) => row.points,
      enableColumnFilter: false,
      enableSorting: false,
      cell: ({ row }) => <div>{row.original.points}</div>,
      size: 40,
    }
  ];

  return (
    <AppAccordion title="6. Publikacje" expandedByDefault>
      <div>
        <AppTable
          data={publications}
          columns={columns}
          emptyTableMessage="Nie dodano żadnej publikacji."
        />
      </div>
    </AppAccordion>
  );
}
