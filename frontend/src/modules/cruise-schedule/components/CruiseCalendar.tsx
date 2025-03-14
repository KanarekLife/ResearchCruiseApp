import { AppCalendar } from '@/core/components/calendar/AppCalendar';
import { CruiseDto } from '@/cruise-schedule/models/CruiseDto';

type Props = {
  cruises: CruiseDto[];
  buttons: React.ReactNode[];
};
export function CruiseCalendar({ cruises, buttons }: Props) {
  const events = cruises.map((cruise) => ({
    title: cruise.id.substring(0, 5),
    start: new Date(cruise.startDate),
    end: new Date(cruise.endDate),
    color: '#' + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, '0'),
  }));

  return <AppCalendar events={events} buttons={(predefinedButtons) => [buttons, ...predefinedButtons]} />;
}
