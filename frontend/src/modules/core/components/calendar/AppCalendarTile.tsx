import { CalendarEventWithRow } from '@/core/components/calendar/AppCalendar';
import { cn, dateToUtcDay } from '@/core/lib/utils';

type Props = {
  date: Date;
  eventsWithRows: CalendarEventWithRow[];
  currentMonth: { month: number; year: number };
};
export function AppCalendarTile({ date, eventsWithRows, currentMonth }: Props) {
  const isCurrentMonth = date.getMonth() === currentMonth.month;
  const isToday = dateToUtcDay(date) === dateToUtcDay(new Date());
  const isSunday = date.getDay() === 0;

  return (
    <div className="relative">
      <div
        className={cn(
          !isCurrentMonth ? 'bg-gray-100' : '',
          isToday ? '!bg-primary-100 !border-primary-500' : '',
          'border border-gray-300 min-h-30 h-full rounded-lg hover:bg-gray-100 transition'
        )}
      >
        <div className="flex flex-col p-2 gap-1">
          <div className={cn(!isCurrentMonth ? 'text-gray-500' : '', isSunday ? 'text-red-500' : '', 'text-end')}>
            {date.getDate()}
          </div>
          <CalendarEventTiles date={date} eventsWithRows={eventsWithRows} />
        </div>
      </div>
    </div>
  );
}

type CalendarEventTilesProps = {
  date: Date;
  eventsWithRows: CalendarEventWithRow[];
};
export function CalendarEventTiles({ date, eventsWithRows }: CalendarEventTilesProps) {
  const todaysEvents = getEventsForDate(date, eventsWithRows);
  const rowCount = Math.max(...todaysEvents.map((event) => event.row + 1));

  const eventTiles = [];
  for (let i = 0; i < rowCount; i++) {
    const eventsInRow = todaysEvents.filter((event) => event.row === i);
    if (eventsInRow.length > 0) {
      const event = eventsInRow[0];
      eventTiles.push(<div className="bg-primary h-8 truncate w-full text-white text-sm p-2">{event.title}</div>);
    } else {
      eventTiles.push(<div className="h-8" />);
    }
  }
  return eventTiles;
}

function getEventsForDate(date: Date, eventsWithRows: CalendarEventWithRow[]): CalendarEventWithRow[] {
  const dayUtc = dateToUtcDay(date);
  const todaysEvents = eventsWithRows.filter(
    (event) => dateToUtcDay(event.start) <= dayUtc && dateToUtcDay(event.end) >= dayUtc
  );
  return todaysEvents;
}
