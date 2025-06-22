import { ColumnDef } from '@tanstack/react-table';

import { AppAccordion } from '@/core/components/AppAccordion';
import { AppTable } from '@/core/components/table/AppTable';
import { useFormB } from '@/cruise-applications/contexts/FormBContext';
import { ResearchAreaDescriptionDto } from '@/cruise-applications/models/ResearchAreaDescriptionDto';

export function FormBResearchAreaSection() {
  const { formA, isReadonly } = useFormB();

  const columns: ColumnDef<ResearchAreaDescriptionDto>[] = [
    {
      header: 'Lp.',
      cell: ({ row }) => `${row.index + 1}. `,
      size: 5,
    },
    {
      header: 'Rejon prowadzenia badań',
      cell: ({ row }) => `${row.original.name}`,
      size: 30,
    },
    {
      header: 'Informacje dodatkowe',
      cell: ({ row }) => `${row.original.info}`,
    },
  ];

  return (
    <AppAccordion title="5. Rejony prowadzanego badań" expandedByDefault>
      <AppTable
        data={formA.researchAreaDescriptions}
        columns={columns}
        buttons={() => []}
        emptyTableMessage="Nie dodano żadnego rejonu."
        disabled={isReadonly}
      />
    </AppAccordion>
  );
}
