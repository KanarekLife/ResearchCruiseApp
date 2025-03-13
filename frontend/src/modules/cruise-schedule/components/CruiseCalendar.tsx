import { AppCalendar } from '@/core/components/calendar/AppCalendar';
import { CruiseDto } from '@/cruise-schedule/models/CruiseDto';

type Props = {
  cruises: CruiseDto[];
  buttons: React.ReactNode[];
};
export function CruiseCalendar({ cruises, buttons }: Props) {
  const events = cruises.map((cruise) => ({
    title: `Rejs ${cruise.id}`,
    start: new Date(cruise.startDate),
    end: new Date(cruise.endDate),
    color: 'blue',
  }));

  return <AppCalendar events={events} buttons={(predefinedButtons) => [buttons, ...predefinedButtons]} />;
}
