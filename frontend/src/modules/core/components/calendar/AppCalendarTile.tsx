import { CalendarEvent } from '@/core/components/calendar/AppCalendar';
import { cn } from '@/core/lib/utils';

type Props = {
  date: Date;
  events: CalendarEvent[];
  currentMonth: { month: number; year: number };
};
export function AppCalendarTile({ date, events, currentMonth }: Props) {
  const isCurrentMonth = date.getMonth() === currentMonth.month;
  const isToday = dateToUtcDay(date) === dateToUtcDay(new Date());
  const isSunday = date.getDay() === 0;

  return (
    <div
      className={cn(
        !isCurrentMonth ? 'bg-gray-100' : '',
        isToday ? '!bg-primary-100 !border-primary-500' : '',
        'border border-gray-300 h-30 rounded-lg hover:bg-gray-100 transition'
      )}
    >
      <div className="flex flex-col p-2 gap-1">
        <div className={cn(!isCurrentMonth ? 'text-gray-500' : '', isSunday ? 'text-red-500' : '', 'text-end')}>
          {date.getDate()}
        </div>
      </div>
    </div>
  );
}

function dateToUtcDay(date: Date): number {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}
