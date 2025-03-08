import { useForm } from '@tanstack/react-form';
import { getRouteApi } from '@tanstack/react-router';
import React, { Suspense } from 'react';

import { AppLayout } from '@/core/components/AppLayout';
import { AppLoader } from '@/core/components/AppLoader';
import { FormB } from '@/cruise-applications/components/formB/FormB';
import { useCruiseForCruiseApplicationQuery } from '@/cruise-applications/hooks/CruiseApplicationsApiHooks';
import { useFormAInitValuesQuery, useFormAQuery } from '@/cruise-applications/hooks/FormAApiHooks';
import { useFormBInitValuesQuery, useFormBQuery } from '@/cruise-applications/hooks/FormBApiHooks';
import { FormBDto } from '@/cruise-applications/models/FormBDto';

export function FormBPage() {
  const { cruiseId } = getRouteApi('/cruises/$cruiseId/formB').useParams();

  const formA = useFormAQuery(cruiseId);
  const formB = useFormBQuery(cruiseId);
  const formAInitValues = useFormAInitValuesQuery();
  const formBInitValues = useFormBInitValuesQuery();
  const cruise = useCruiseForCruiseApplicationQuery(cruiseId);

  const form = useForm<FormBDto>({
    defaultValues: formB.data ?? {
      isCruiseManagerPresent: 'true',
      permissions: formA.data.permissions,
      ugTeams: formA.data.ugTeams,
      guestTeams: formA.data.guestTeams,
      crewMembers: [],
      shortResearchEquipments: [],
      longResearchEquipments: [],
      ports: [],
      cruiseDayDetails: [],
      researchEquipment: [],
      shipEquipmentsIds: [],
    },
  });
  const [hasFormBeenSubmitted, setHasFormBeenSubmitted] = React.useState(false);

  const context = {
    form,
    formA: formA.data,
    formAInitValues: formAInitValues.data,
    formBInitValues: formBInitValues.data,
    cruise: cruise.data,
    isReadonly: false,
    hasFormBeenSubmitted,
    onSubmit: handleSubmit,
    onSaveDraft: handleDraftSave,
  };

  function handleSubmit() {
    setHasFormBeenSubmitted(true);
  }

  function handleDraftSave() {}

  return (
    <>
      <AppLayout title="Formularz B">
        <Suspense fallback={<AppLoader />}>
          <FormB context={context} />
        </Suspense>
      </AppLayout>
    </>
  );
}
