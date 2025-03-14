import { AppLink } from '@/core/components/AppLink';
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
          'border rounded-xl border-gray-300 min-h-30 h-full hover:bg-gray-100 transition mb-3'
        )}
      >
        <div className="p-2 gap-1">
          <div className={cn(!isCurrentMonth ? 'text-gray-500' : '', isSunday ? 'text-red-500' : '', 'text-end')}>
            {date.getDate()}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-1 mt-2 -m-2">
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
    if (eventsInRow.length === 1) {
      const event = eventsInRow[0];
      const start = date.getDay() === 1 || dateToUtcDay(event.start) === dateToUtcDay(date);
      const end = date.getDay() === 0 || dateToUtcDay(event.end) === dateToUtcDay(date);

      const className = cn(
        start ? 'rounded-l-lg ml-3' : '',
        end ? 'rounded-r-lg mr-3' : '',
        'bg-primary h-8 truncate text-white text-sm p-2 z-10'
      );

      eventTiles.push(
        event.link ? (
          <AppLink href={event.link} variant="plain" className={className}>
            {start ? event.title : ''}
          </AppLink>
        ) : (
          <div className={className}>{start ? event.title : ''}</div>
        )
      );
    } else if (eventsInRow.length === 0) {
      eventTiles.push(<div className="h-8" />);
    } else {
      throw new Error('Events in row must be either 0 or 1');
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
