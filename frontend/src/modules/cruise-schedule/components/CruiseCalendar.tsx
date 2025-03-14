import { AppCalendar } from '@/core/components/calendar/AppCalendar';
import { CruiseDto } from '@/cruise-schedule/models/CruiseDto';

type Props = {
  cruises: CruiseDto[];
  buttons: React.ReactNode[];
};
export function CruiseCalendar({ cruises, buttons }: Props) {
  const events = cruises.map((cruise) => ({
    title:
      cruise.mainCruiseManagerFirstName.length > 0
        ? `Rejs ${cruise.mainCruiseManagerFirstName} ${cruise.mainCruiseManagerLastName}`
        : 'Rejs bez kierownika',
    start: new Date(cruise.startDate),
    end: new Date(cruise.endDate),
    link: `/cruises/${cruise.id}`,
  }));

  return <AppCalendar events={events} buttons={(predefinedButtons) => [buttons, ...predefinedButtons]} />;
}
