import { AnimatePresence, motion } from 'motion/react';

import { AppAccordion } from '@/core/components/AppAccordion';
import { AppAlert } from '@/core/components/AppAlert';
import { AppDropdownInput, AppDropdownInputOption } from '@/core/components/inputs/AppDropdownInput';
import { getErrors } from '@/core/lib/utils';
import { mapPersonToLabel } from '@/cruise-applications/helpers/mapPersonToLabel';
import { CruiseApplicationDto } from '@/cruise-applications/models/CruiseApplicationDto';
import { FormUserDto } from '@/cruise-applications/models/FormUserDto';
import { useCruiseForm } from '@/cruise-schedule/contexts/CruiseFormContext';

export function CruiseFormManagerSelection() {
  const { form, cruiseApplications, isReadonly } = useCruiseForm();

  const possibleUsers = getDropdownUsersForApplications(
    cruiseApplications ?? [],
    form.state.values.cruiseApplicationsIds
  );

  return (
    <AppAccordion title="Kierownik główny i zastępca kierownika głównego" expandedByDefault>
      <AnimatePresence initial={possibleUsers.length !== 0}>
        {possibleUsers.length === 0 && (
          <motion.div
            className="mt-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ ease: 'easeOut' }}
          >
            <AppAlert>Brak zgłoszeń przypisanych do rejsu, nie można wybrać kierowników.</AppAlert>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <form.Field
          name="managersTeam.mainCruiseManagerId"
          children={(field) => (
            <AppDropdownInput
              name={field.name}
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={getErrors(field.state.meta)}
              allOptions={possibleUsers}
              label="Kierownik główny"
              required
              placeholder="Wybierz kierownika głównego"
              disabled={isReadonly}
            />
          )}
        />

        <form.Field
          name="managersTeam.mainDeputyManagerId"
          children={(field) => (
            <AppDropdownInput
              name={field.name}
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={getErrors(field.state.meta)}
              allOptions={possibleUsers}
              label="Zastępca kierownika głównego"
              required
              placeholder="Wybierz zastępcę kierownika głównego"
              disabled={isReadonly}
            />
          )}
        />
      </div>
    </AppAccordion>
  );
}

function getDropdownUsersForApplications(
  cruiseApplications: CruiseApplicationDto[],
  selectedApplicationIds: string[]
): AppDropdownInputOption[] {
  const filteredApplications = cruiseApplications.filter((application) =>
    selectedApplicationIds.includes(application.id)
  );

  const users = filteredApplications.reduce((acc, application) => {
    const manager = {
      id: application.cruiseManagerId,
      firstName: application.cruiseManagerFirstName,
      lastName: application.cruiseManagerLastName,
      email: application.cruiseManagerEmail,
    };

    const deputy = {
      id: application.deputyManagerId,
      firstName: application.deputyManagerFirstName,
      lastName: application.deputyManagerLastName,
      email: application.deputyManagerEmail,
    };

    if (!acc.some((user) => user.id === manager.id)) {
      acc.push(manager);
    }

    if (!acc.some((user) => user.id === deputy.id)) {
      acc.push(deputy);
    }

    return acc;
  }, [] as FormUserDto[]);

  return users.reduce((acc, user) => {
    acc.push(mapPersonToLabel(user));
    return acc;
  }, [] as AppDropdownInputOption[]);
}
