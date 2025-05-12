/* eslint-disable @eslint-react/no-array-index-key */
import dayjs from 'dayjs';
import { Fragment, RefObject } from 'react';

import { cn } from '@/core/lib/utils';
import { PrintableResearchTaskDetails } from '@/cruise-applications/components/common/printable-research-task-details/PrintableResearchTaskDetails';
import { useFormB } from '@/cruise-applications/contexts/FormBContext';
import { mapPersonToText } from '@/cruise-applications/helpers/PersonMappers';
import { getContractCategoryName } from '@/cruise-applications/models/ContractDto';
import { getPublicationCategoryLabel } from '@/cruise-applications/models/PublicationDto';
import { getTaskName } from '@/cruise-applications/models/ResearchTaskDto';

function getAction(action: 'Put' | 'Collect'): string {
  if (action === 'Put') {
    return 'Pozostawienie';
  }

  if (action === 'Collect') {
    return 'Zabranie';
  }

  throw new Error('Invalid action');
}

type Props = {
  ref: RefObject<HTMLDivElement | null>;
};
export function FormBPrintTemplate({ ref }: Props) {
  const { cruise, formAInitValues, formBInitValues, formA, form } = useFormB();
  const values = form.state.values;

  return (
    <div ref={ref} className="bg-white mx-auto w-[21cm]">
      <h1 className="text-3xl text-center pt-[1cm]">Formularz B</h1>

      <section style={{ pageBreakInside: 'avoid' }} className="px-[1cm] pt-[1cm]">
        <h2 className="text-2xl mb-4">1. Informacje o rejsie</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <span>Numer rejsu: </span>
          <span>{cruise.number}</span>
          <span>Terminy rozpoczęcia i zakończenia: </span>
          <span>
            {dayjs(cruise.startDate).format('DD.MM.YYYY HH:mm')} - {dayjs(cruise.endDate).format('DD.MM.YYYY HH:mm')}
          </span>
        </div>
      </section>

      <section style={{ pageBreakInside: 'avoid' }} className="px-[1cm] pt-[1cm]">
        <h2 className="text-2xl mb-4">2. Kierownik zgłaszanego rejsu</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <span>Kierownik rejsu: </span>
          <span>
            {mapPersonToText(formAInitValues.cruiseManagers.filter((x) => x.id === formA.cruiseManagerId)[0])}
          </span>
          <span>Zastępca kierownika rejsu: </span>
          <span>
            {mapPersonToText(formAInitValues.deputyManagers.filter((x) => x.id === formA.deputyManagerId)[0])}
          </span>
          <span>Czy kierownik jest obecny na rejsie: </span>
          <span>{values.isCruiseManagerPresent ? 'Tak' : 'Nie'}</span>
        </div>
      </section>

      <section style={{ pageBreakInside: 'avoid' }} className="px-[1cm] pt-[1cm]">
        <h2 className="text-2xl mb-4">3. Sposób wykorzystywania statku</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <span>Sposób wykorzystania statku:</span>
          <span>{formAInitValues?.shipUsages.filter((_, i) => i === parseInt(formA.shipUsage!))}</span>
          <span>Inny sposób użycia:</span>
          <span>{formA.differentUsage}</span>
        </div>
      </section>

      <section style={{ pageBreakInside: 'avoid' }} className="px-[1cm] pt-[1cm]">
        <h2 className="text-2xl mb-4">4. Dodatkowe pozwolenia do planowanych podczas rejsu badań</h2>
        <div className="grid grid-cols-10 gap-x-4">
          <span className="mb-2 font-semibold">Lp.</span>
          <span className="mb-2 font-semibold col-span-3 text-center">Treść pozwolenia</span>
          <span className="mb-2 font-semibold col-span-3 text-center">Organ wydający</span>
          <span className="mb-2 font-semibold col-span-3 text-center">Skan</span>
          {values.permissions.map((x, i) => (
            <Fragment key={i}>
              <span className={cn(i > 0 ? 'mt-2' : '')}>{i + 1}.</span>
              <span className={cn(i > 0 ? 'mt-2' : '', 'col-span-3 text-center')}>{x.description}</span>
              <span className={cn(i > 0 ? 'mt-2' : '', 'col-span-3 text-center')}>{x.executive}</span>
              <span className={cn(i > 0 ? 'mt-2' : '', 'col-span-3 text-center')}>{x.scan!.name}</span>
            </Fragment>
          ))}
        </div>
      </section>

      <section style={{ pageBreakInside: 'avoid' }} className="px-[1cm] pt-[1cm]">
        <h2 className="text-2xl mb-4">5. Rejon prowadzenia badań</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <span>Rejon prowadzenia badań: </span>
          <span>{formAInitValues.researchAreas.filter((x) => x.id === formA.researchAreaId)[0].name}</span>
          <span>Informacje dodatkowe: </span>
          <span>{formA.researchAreaInfo}</span>
        </div>
      </section>

      <section style={{ pageBreakInside: 'avoid' }} className="px-[1cm] pt-[1cm]">
        <h2 className="text-2xl mb-4">6. Cel rejsu</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <span>Cel rejsu: </span>
          <span>{formAInitValues.cruiseGoals.filter((_, i) => i === parseInt(formA.cruiseGoal))[0]}</span>
          <span>Opis: </span>
          <span>{formA.cruiseGoalDescription}</span>
        </div>
      </section>

      <section style={{ pageBreakInside: 'avoid' }} className="px-[1cm] pt-[1cm]">
        <h2 className="text-2xl mb-4">7. Zadania do zrealizowania w trakcie rejsu</h2>
        <div className="grid grid-cols-13 gap-x-8">
          <span className="mb-2 font-semibold">Lp.</span>
          <span className="mb-2 font-semibold col-span-4 text-center">Zadanie</span>
          <span className="mb-2 font-semibold col-span-8 text-center">Szczegóły</span>
          {formA.researchTasks.map((x, i) => (
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

      <section style={{ pageBreakInside: 'avoid' }} className="px-[1cm] pt-[1cm]">
        <h2 className="text-2xl mb-4">
          8. Umowy regulujące współpracę, w ramach której miałyby być realizowane zadania badawcze
        </h2>
        <div className="grid grid-cols-10 gap-x-8">
          <span className="mb-2 font-semibold">Lp.</span>
          <span className="mb-2 font-semibold col-span-3 text-center">Kategoria</span>
          <span className="mb-2 font-semibold col-span-6 text-center">Pozostałe szczegóły</span>
          {formA.contracts.map((x, i) => (
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

      <section style={{ pageBreakInside: 'avoid' }} className="px-[1cm] pt-[1cm]">
        <h2 className="text-2xl mb-4">9. Zespoły badawcze, które miałyby uczestniczyć w rejsie</h2>

        <div className="grid grid-cols-7 gap-x-8 mb-8">
          <span className="mb-2 font-semibold">Lp.</span>
          <span className="mb-2 font-semibold col-span-4 text-center">Jednostka</span>
          <span className="mb-2 font-semibold col-span-1 text-center">Liczba pracowników</span>
          <span className="mb-2 font-semibold col-span-1 text-center">Liczba studentów</span>
          {values.ugTeams.map((x, i) => (
            <Fragment key={i}>
              <span className={cn(i > 0 ? 'mt-4' : '', '')}>{i + 1}.</span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-4')}>
                {formAInitValues.ugUnits.filter(({ id }) => id === x.ugUnitId)[0].name}
              </span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-1 text-center')}>{x.noOfEmployees}</span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-1 text-center')}>{x.noOfStudents}</span>
            </Fragment>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-x-8 mb-8">
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

        <div className="grid grid-cols-9 gap-x-8">
          <div className="mb-2 font-semibold col-span-1 text-center">Lp.</div>
          <div className="mb-2 font-semibold col-span-2 text-center">Dane osobowe</div>
          <div className="mb-2 font-semibold col-span-4 text-center">Dokument tożsamości</div>
          <div className="mb-2 font-semibold col-span-2 text-center">Nazwa jednostki</div>
          {values.crewMembers.map((x, i) => (
            <Fragment key={i}>
              <div className={cn(i > 0 ? 'mt-4' : '', 'col-span-1 grid place-items-center')}>{i + 1}.</div>
              <div className={cn(i > 0 ? 'mt-4' : '', 'col-span-2 grid place-items-center')}>
                {x.title} {x.firstName} {x.lastName}
              </div>
              <div className={cn(i > 0 ? 'mt-4' : '', 'col-span-4')}>
                <div className="flex justify-between items-center">
                  <span>Miejsce urodzenia:</span>
                  <span>{x.birthPlace}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Data urodzenia:</span>
                  <span>{dayjs(x.birthDate).format('DD.MM.YYYY')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Numer ID dokumentu:</span>
                  <span>{x.documentNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Data ważności dokumentu:</span>
                  <span>{dayjs(x.documentExpiryDate).format('DD.MM.YYYY')}</span>
                </div>
              </div>
              <div className={cn(i > 0 ? 'mt-4' : '', 'col-span-2 grid place-items-center')}>{x.institution}</div>
            </Fragment>
          ))}
        </div>
      </section>

      <section style={{ pageBreakInside: 'avoid' }} className="px-[1cm] pt-[1cm]">
        <h2 className="text-2xl mb-4">10. Publikacje</h2>
        <div className="grid grid-cols-15 gap-x-8">
          <span className="mb-2 font-semibold col-span-1">Lp.</span>
          <span className="mb-2 font-semibold col-span-2">Kategoria</span>
          <span className="mb-2 font-semibold col-span-8 text-center">Informacje</span>
          <span className="mb-2 font-semibold col-span-2">Rok wydania</span>
          <span className="mb-2 font-semibold col-span-2">Punkty ministerialne</span>
          {formA.publications.map((x, i) => (
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

      <section style={{ pageBreakInside: 'avoid' }} className="px-[1cm] pt-[1cm]">
        <h2 className="text-2xl mb-4">
          11. Zadania SPUB, z którymi pokrywają się zadania planowane do realizacji na rejsie
        </h2>
        <div className="grid grid-cols-11 gap-x-8">
          <span className="mb-2 font-semibold">Lp.</span>
          <span className="mb-2 font-semibold col-span-2">Rok rozpoczęcia</span>
          <span className="mb-2 font-semibold col-span-2">Rok zakończenia</span>
          <span className="mb-2 font-semibold col-span-6">Nazwa zadania</span>
          {formA.spubTasks.map((x, i) => (
            <Fragment key={i}>
              <span className={cn(i > 0 ? 'mt-4' : '')}>{i + 1}.</span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-2')}>{x.yearFrom}</span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-2')}>{x.yearTo}</span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-6')}>{x.name}</span>
            </Fragment>
          ))}
        </div>
      </section>

      <section style={{ pageBreakInside: 'avoid' }} className="px-[1cm] pt-[1cm] space-y-4">
        <h2 className="text-2xl">12. Szczegóły rejsu</h2>

        <div>
          <h3 className="text-xl mb-2">Wystawienie sprzętu</h3>
          <div className="grid grid-cols-6 gap-x-8">
            <div className="mb-2 font-semibold col-span-1 text-center">Lp.</div>
            <div className="mb-2 font-semibold col-span-1 text-center">Od</div>
            <div className="mb-2 font-semibold col-span-1 text-center">Do</div>
            <div className="mb-2 font-semibold col-span-3 text-center">Nazwa sprzętu</div>
            {values.shortResearchEquipments.map((x, i) => (
              <Fragment key={i}>
                <div className={cn(i > 0 ? 'mt-4' : '', 'col-span-1 grid place-items-center')}>{i + 1}.</div>
                <div className={cn(i > 0 ? 'mt-4' : '', 'col-span-1 grid place-items-center')}>
                  {dayjs(x.startDate).format('DD.MM.YYYY')}
                </div>
                <div className={cn(i > 0 ? 'mt-4' : '', 'col-span-1 grid place-items-center')}>
                  {dayjs(x.endDate).format('DD.MM.YYYY')}
                </div>
                <div className={cn(i > 0 ? 'mt-4' : '', 'col-span-3 grid place-items-center')}>{x.name}</div>
              </Fragment>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl mb-2">Pozostawienie lub zabranie sprzętu</h3>
          <div className="grid grid-cols-6 gap-x-8">
            <div className="mb-2 font-semibold col-span-1 text-center">Lp.</div>
            <div className="mb-2 font-semibold col-span-1 text-center">Czynność</div>
            <div className="mb-2 font-semibold col-span-1 text-center">Czas</div>
            <div className="mb-2 font-semibold col-span-3 text-center">Nazwa sprzętu</div>
            {values.longResearchEquipments.map((x, i) => (
              <Fragment key={i}>
                <div className={cn(i > 0 ? 'mt-4' : '', 'col-span-1 grid place-items-center')}>{i + 1}.</div>
                <div className={cn(i > 0 ? 'mt-4' : '', 'col-span-1 grid place-items-center')}>
                  {getAction(x.action)}
                </div>
                <div className={cn(i > 0 ? 'mt-4' : '', 'col-span-1 grid place-items-center')}>{x.duration}</div>
                <div className={cn(i > 0 ? 'mt-4' : '', 'col-span-3 grid place-items-center')}>{x.name}</div>
              </Fragment>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl mb-2">Wchodzenie lub wychodzenie z portu</h3>
          <div className="grid grid-cols-7 gap-x-8">
            <div className="mb-2 font-semibold col-span-1 text-center">Lp.</div>
            <div className="mb-2 font-semibold col-span-2 text-center">Wejście</div>
            <div className="mb-2 font-semibold col-span-2 text-center">Wyjście</div>
            <div className="mb-2 font-semibold col-span-2 text-center">Nazwa portu</div>
            {values.ports.map((x, i) => (
              <Fragment key={i}>
                <div className={cn(i > 0 ? 'mt-4' : '', 'col-span-1 grid place-items-center')}>{i + 1}.</div>
                <div className={cn(i > 0 ? 'mt-4' : '', 'col-span-2 grid place-items-center')}>
                  {dayjs(x.startTime).format('DD.MM.YYYY HH:mm')}
                </div>
                <div className={cn(i > 0 ? 'mt-4' : '', 'col-span-2 grid place-items-center')}>
                  {dayjs(x.endTime).format('DD.MM.YYYY HH:mm')}
                </div>
                <div className={cn(i > 0 ? 'mt-4' : '', 'col-span-2 grid place-items-center')}>{x.name}</div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section style={{ pageBreakInside: 'avoid' }} className="px-[1cm] pt-[1cm]">
        <h2 className="text-2xl mb-4">13. Szczegółowy plan zadań do realizacji podczas rejsu</h2>
        <div className="grid grid-cols-6 gap-x-8">
          <span className="mb-2 font-semibold col-span-1">Dzień</span>
          <span className="mb-2 font-semibold col-span-1">Liczba godzin</span>
          <span className="mb-2 font-semibold col-span-1">Nazwa zadania</span>
          <span className="mb-2 font-semibold col-span-1">Rejon zadania</span>
          <span className="mb-2 font-semibold col-span-1">Pozycja</span>
          <span className="mb-2 font-semibold col-span-1">Uwagi</span>
          {values.cruiseDaysDetails.map((x, i) => (
            <Fragment key={i}>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-1')}>{x.number}</span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-1')}>{x.hours}</span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-1')}>{x.taskName}</span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-1')}>{x.region}</span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-1')}>{x.position}</span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-1')}>{x.comment}</span>
            </Fragment>
          ))}
        </div>
      </section>

      <section style={{ pageBreakInside: 'avoid' }} className="px-[1cm] pt-[1cm]">
        <h2 className="text-2xl mb-4">14. Lista sprzętu i aparatury badawczej planowanej do użycia podczas rejsu</h2>
        <div className="grid grid-cols-6 gap-x-8">
          <span className="mb-2 font-semibold col-span-1">Lp.</span>
          <span className="mb-2 font-semibold col-span-2">Nazwa sprzętu / aparatury</span>
          <span className="mb-2 font-semibold col-span-2">Data zgłoszenia do ubezpieczenia</span>
          <span className="mb-2 font-semibold col-span-1">Zgoda opiekuna</span>
          {values.researchEquipments.map((x, i) => (
            <Fragment key={i}>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-1')}>{i + 1}.</span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-2')}>{x.name}</span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-2')}>
                {x.insuranceStartDate ? dayjs(x.insuranceStartDate).format('DD.MM.YYYY') : ''}
                {x.insuranceStartDate || x.insuranceEndDate ? ' - ' : ''}
                {x.insuranceEndDate ? dayjs(x.insuranceEndDate).format('DD.MM.YYYY') : ''}
                {!x.insuranceStartDate && !x.insuranceEndDate ? 'Nie zgłoszono' : ''}
              </span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-1')}>{x.permission === 'true' ? 'Tak' : 'Nie'}</span>
            </Fragment>
          ))}
        </div>
      </section>

      <section style={{ pageBreakInside: 'avoid' }} className="px-[1cm] pt-[1cm]">
        <h2 className="text-2xl mb-4">15. Elementy techniczne statku wykorzystywane podczas rejsu</h2>
        <div className="grid grid-cols-4 gap-x-8">
          <span className="mb-2 font-semibold col-span-3">Element</span>
          <span className="mb-2 font-semibold col-span-1">W użyciu</span>
          {formBInitValues.shipEquipments.map((x, i) => (
            <Fragment key={i}>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-3')}>{x.name}</span>
              <span className={cn(i > 0 ? 'mt-4' : '', 'col-span-1')}>
                {values.shipEquipmentsIds.filter((id) => id === x.id).length > 0 ? 'Tak' : 'Nie'}
              </span>
            </Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}
