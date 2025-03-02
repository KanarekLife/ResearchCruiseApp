import { AppAccordion } from '@/core/components/AppAccordion';
import { AppInput } from '@/core/components/inputs/AppInput';

import { CruiseApplicationDto } from '@/cruise-applications/models/CruiseApplicationDto';
import { AppLink } from '@/core/components/AppLink';

export function ApplicationDetailsInformationSection({ application }: { application: CruiseApplicationDto }) {

  return (
    <AppAccordion title="1. Informacje o zgłoszeniu" expandedByDefault>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AppInput
          name="number"
          value={application.number}
          label="Numer zgłoszenia:"
          required
          disabled
        />
        <AppInput
          name="date"
          value={application.date}
          label="Data wysłania:"
          required
          disabled
        />
        <AppInput
          name="year"
          value={`${application.year}`}
          label="Rok rejsu:"
          required
          disabled
        />
        <AppInput
          name="cruiseLeader"
          value={`${application.cruiseManagerFirstName} ${application.cruiseManagerLastName} (${application.cruiseManagerEmail})`}
          label="Kierownik:"
          required
          disabled
        />
        <AppInput
          name="deputyManager"
          value={`${application.deputyManagerFirstName} ${application.deputyManagerLastName} (${application.deputyManagerEmail})`}
          label="Zastępca kierownika:"
          required
          disabled
        />
        <div className="grid grid-cols-1 gap-1">
          <strong>Formularze:</strong>
          <AppLink href={`/cruises/${application.id}/formA`} disabled={!application.hasFormA}>Formularz A</AppLink>
          <AppLink href={`/cruises/${application.id}/formB`} disabled={!application.hasFormB}>Formularz B</AppLink>
          <AppLink href={`/cruises/${application.id}/formC`} disabled={!application.hasFormC}>Formularz C</AppLink>
        </div>
        <AppInput
          name="status"
          value={application.status}
          label="Status zgłoszenia:"
          required
          disabled
        />
        <AppInput
          name="points"
          value={`${application.points}`}
          label="Punkty:"
          required
          disabled
        />
      </div>
    </AppAccordion>
  );
}
