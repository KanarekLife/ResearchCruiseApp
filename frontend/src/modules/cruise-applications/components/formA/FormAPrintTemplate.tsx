/* eslint-disable @eslint-react/no-array-index-key */
import { Fragment, RefObject } from 'react';

import { cn } from '@/core/lib/utils';
import { getExplanationForPeriod } from '@/cruise-applications/components/common/cruisePeriodExplanation';
import { PrintableResearchTaskDetails } from '@/cruise-applications/components/common/printable-research-task-details/PrintableResearchTaskDetails';
import { mapPersonToText } from '@/cruise-applications/helpers/PersonMappers';
import { getContractCategoryName } from '@/cruise-applications/models/ContractDto';
import { FormADto } from '@/cruise-applications/models/FormADto';
import { FormAInitValuesDto } from '@/cruise-applications/models/FormAInitValuesDto';
import { getPublicationCategoryLabel } from '@/cruise-applications/models/PublicationDto';
import { getTaskName } from '@/cruise-applications/models/ResearchTaskDto';

type Props = {
  initValues: FormAInitValuesDto;
  values: FormADto;
  ref: RefObject<HTMLDivElement | null>;
};
export function FormAPrintTemplate({ initValues, values, ref }: Props) {
  return (
    <div ref={ref} className="not-print:hidden bg-white mx-auto w-[21cm] px-[1cm] py-[0.5cm] space-y-8">
      <h1 className="text-3xl text-center">Formularz A</h1>

      <section style={{ pageBreakInside: 'avoid' }}>
        <h2 className="text-2xl mb-4">1. Kierownik zgłaszanego rejsu</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <span>Kierownik rejsu: </span>
          <span>{mapPersonToText(initValues.cruiseManagers.filter((x) => x.id === values.cruiseManagerId)[0])}</span>
          <span>Zastępca kierownika rejsu: </span>
          <span>{mapPersonToText(initValues.deputyManagers.filter((x) => x.id === values.deputyManagerId)[0])}</span>
          <span>Rok: </span>
          <span>{values.year}</span>
        </div>
      </section>

      <section style={{ pageBreakInside: 'avoid' }}>
        <h2 className="text-2xl mb-4">2. Czas trwania zgłaszanego rejsu</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <span>Dopuszczalny okres, w którym miałby się odbywać rejs: </span>
          <span>
            {getExplanationForPeriod(parseInt(values.acceptablePeriod[0]), parseInt(values.acceptablePeriod[1]))}
          </span>
          <span>Optymalny okres, w którym miałby się odbywać rejs: </span>
          <span>{getExplanationForPeriod(parseInt(values.optimalPeriod[0]), parseInt(values.optimalPeriod[1]))}</span>
          <span>Liczba planowanych dób rejsowych: </span>
          <span>{parseInt(values.cruiseHours) / 24}</span>
          <span>Liczba planowanych godzin rejsowych</span>
          <span>{values.cruiseHours} h</span>
          <span>Uwagi dotyczące terminu</span>
          <span>{values.periodNotes}</span>
          <span>Statek na potrzeby badań będzie wykorzystywany</span>
          <span>{initValues?.shipUsages.filter((_, i) => i === parseInt(values.shipUsage!))}</span>
          <span>Inny sposób użycia</span>
          <span>{values.differentUsage}</span>
        </div>
      </section>

      <section style={{ pageBreakInside: 'avoid' }}>
        <h2 className="text-2xl mb-4">3. Dodatkowe pozwolenia do planowanych podczas rejsu badań</h2>
        <div className="grid grid-cols-7 gap-x-4">
          <span className="mb-2 font-semibold">Lp.</span>
          <span className="mb-2 font-semibold col-span-3 text-center">Treść pozwolenia</span>
          <span className="mb-2 font-semibold col-span-3 text-center">Organ wydający</span>
          {values.permissions.map((x, i) => (
            <Fragment key={i}>
              <span className={cn(i > 0 ? 'mt-2' : '')}>{i + 1}.</span>
              <span className={cn(i > 0 ? 'mt-2' : '', 'col-span-3 text-center')}>{x.description}</span>
              <span className={cn(i > 0 ? 'mt-2' : '', 'col-span-3 text-center')}>{x.executive}</span>
            </Fragment>
          ))}
        </div>
      </section>

      <section style={{ pageBreakInside: 'avoid' }}>
        <h2 className="text-2xl mb-4">4. Rejon prowadzenia badań</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <span>Rejon prowadzenia badań: </span>
          <span>{initValues.researchAreas.filter((x) => x.id === values.researchAreaId)[0].name}</span>
          <span>Informacje dodatkowe: </span>
          <span>{values.researchAreaInfo}</span>
        </div>
      </section>

      <section style={{ pageBreakInside: 'avoid' }}>
        <h2 className="text-2xl mb-4">5. Cel rejsu</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <span>Cel rejsu: </span>
          <span>{initValues.cruiseGoals.filter((_, i) => i === parseInt(values.cruiseGoal))[0]}</span>
          <span>Opis: </span>
          <span>{values.cruiseGoalDescription}</span>
        </div>
      </section>

      <section style={{ pageBreakInside: 'avoid' }}>
        <h2 className="text-2xl mb-4">6. Zadania do zrealizowania w trakcie rejsu</h2>
        <div className="grid grid-cols-13 gap-x-8">
          <span className="mb-2 font-semibold">Lp.</span>
          <span className="mb-2 font-semibold col-span-4 text-center">Zadanie</span>
          <span className="mb-2 font-semibold col-span-8 text-center">Szczegóły</span>
          {values.researchTasks.map((x, i) => (
            <Fragment key={i}>
              <div className={cn(i > 0 ? 'mt-4' : '', 'flex items-center')}>
                <span>{i + 1}.</span>
              </div>
              <div className={cn(i > 0 ? 'mt-4' : '', 'col-span-4 flex items-center')}>
                <span>{getTaskName(x.type)}</span>
              </div>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-8')}>
                <PrintableResearchTaskDetails data={x} />
              </span>
            </Fragment>
          ))}
        </div>
      </section>

      <section style={{ pageBreakInside: 'avoid' }}>
        <h2 className="text-2xl mb-4">
          7. Umowy regulujące współpracę, w ramach której miałyby być realizowane zadania badawcze
        </h2>
        <div className="grid grid-cols-10 gap-x-8">
          <span className="mb-2 font-semibold">Lp.</span>
          <span className="mb-2 font-semibold col-span-3 text-center">Kategoria</span>
          <span className="mb-2 font-semibold col-span-6 text-center">Pozostałe szczegóły</span>
          {values.contracts.map((x, i) => (
            <Fragment key={i}>
              <div className={cn(i > 0 ? 'mt-4' : '', 'flex items-center')}>
                <span>{i + 1}.</span>
              </div>
              <div className={cn(i > 0 ? 'mt-4' : '', 'col-span-3 flex items-center')}>
                <span>{getContractCategoryName(x.category)}</span>
              </div>
              <div className={cn(i > 0 ? 'mt-4' : '', 'col-span-6 flex flex-col space-y-2')}>
                <span className="font-semibold">Szczegóły</span>
                <span className="col-span-7 grid grid-cols-2 gap-x-4">
                  <span>Nazwa insytucji:</span>
                  <span>{x.institutionName}</span>
                  <span>Jednostka:</span>
                  <span>{x.institutionUnit}</span>
                  <span>Lokalizacja instytucji:</span>
                  <span>{x.institutionLocalization}</span>
                </span>
                <span className="font-semibold">Opis</span>
                <span>{x.description}</span>
                <span className="font-semibold">Skan</span>
                <span>{x.scan?.name}</span>
              </div>
            </Fragment>
          ))}
        </div>
      </section>

      <section style={{ pageBreakInside: 'avoid' }}>
        <h2 className="text-2xl mb-4">8. Zespoły badawcze, które miałyby uczestniczyć w rejsie</h2>
        <div className="grid grid-cols-7 gap-x-8 mb-8">
          <span className="mb-2 font-semibold">Lp.</span>
          <span className="mb-2 font-semibold col-span-4 text-center">Jednostka</span>
          <span className="mb-2 font-semibold col-span-1 text-center">Liczba pracowników</span>
          <span className="mb-2 font-semibold col-span-1 text-center">Liczba studentów</span>
          {values.ugTeams.map((x, i) => (
            <Fragment key={i}>
              <span className={cn(i > 0 ? 'mt-4' : '', '')}>{i + 1}.</span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-4')}>
                {initValues.ugUnits.filter(({ id }) => id === x.ugUnitId)[0].name}
              </span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-1 text-center')}>{x.noOfEmployees}</span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-1 text-center')}>{x.noOfStudents}</span>
            </Fragment>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-x-8">
          <span className="mb-2 font-semibold">Lp.</span>
          <span className="mb-2 font-semibold col-span-4 text-center">Instytucja</span>
          <span className="mb-2 font-semibold col-span-2 text-center">Liczba osób</span>
          {values.guestTeams.map((x, i) => (
            <Fragment key={i}>
              <span className={cn(i > 0 ? 'mt-4' : '', '')}>{i + 1}.</span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-4')}>{x.name}</span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-2 text-center')}>{x.noOfPersons}</span>
            </Fragment>
          ))}
        </div>
      </section>

      <section style={{ pageBreakInside: 'avoid' }}>
        <h2 className="text-2xl mb-4">9. Publikacje</h2>
        <div className="grid grid-cols-15 gap-x-8">
          <span className="mb-2 font-semibold col-span-1">Lp.</span>
          <span className="mb-2 font-semibold col-span-2">Kategoria</span>
          <span className="mb-2 font-semibold col-span-8 text-center">Informacje</span>
          <span className="mb-2 font-semibold col-span-2">Rok wydania</span>
          <span className="mb-2 font-semibold col-span-2">Punkty ministerialne</span>
          {values.publications.map((x, i) => (
            <Fragment key={i}>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-1')}>{i + 1}.</span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-2')}>{getPublicationCategoryLabel(x.category)}</span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'grid grid-cols-2 gap-x-4 col-span-8')}>
                <span>DOI:</span>
                <span>{x.doi}</span>
                <span>Autorzy:</span>
                <span>{x.authors}</span>
                <span>Tytuł:</span>
                <span>{x.title}</span>
                <span>Czasopismo:</span>
                <span>{x.magazine}</span>
              </span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-2')}>{x.year}</span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-2')}>{x.ministerialPoints}</span>
            </Fragment>
          ))}
        </div>
      </section>

      <section style={{ pageBreakInside: 'avoid' }}>
        <h2 className="text-2xl mb-4">
          10. Zadania SPUB, z którymi pokrywają się zadania planowane do realizacji na rejsie
        </h2>
        <div className="grid grid-cols-11 gap-x-8">
          <span className="mb-2 font-semibold">Lp.</span>
          <span className="mb-2 font-semibold col-span-2">Rok rozpoczęcia</span>
          <span className="mb-2 font-semibold col-span-2">Rok zakończenia</span>
          <span className="mb-2 font-semibold col-span-6">Nazwa zadania</span>
          {values.spubTasks.map((x, i) => (
            <Fragment key={i}>
              <span className={cn(i > 0 ? 'mt-4' : '')}>{i + 1}.</span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-2')}>{x.yearFrom}</span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-2')}>{x.yearTo}</span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-6')}>{x.name}</span>
            </Fragment>
          ))}
        </div>
      </section>

      <section style={{ pageBreakInside: 'avoid' }}>
        <h2 className="text-2xl mb-2">11. Dane kontaktowe przełożonego</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <span>Adres e-mail przełożonego: </span>
          <span>{values.supervisorEmail}</span>
        </div>
      </section>
    </div>
  );
}
