import ChevronLeft from 'bootstrap-icons/icons/chevron-left.svg?react';
import ChevronRight from 'bootstrap-icons/icons/chevron-right.svg?react';
import React from 'react';

import { AppButton } from '@/core/components/AppButton';
import { AppCalendarTile } from '@/core/components/calendar/AppCalendarTile';
import { AppMonthPickerPopover } from '@/core/components/inputs/dates/AppMonthPickerPopover';
import { dateToUtcDay } from '@/core/lib/utils';

export type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;

  onClick?: () => void;
};

export type CalendarEventWithRow = CalendarEvent & { row: number };

const weekDays = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
const months = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
];

type Props = {
  events: CalendarEvent[];
  buttons?: (predefinedButtons: React.ReactNode[]) => React.ReactNode[];
};
export function AppCalendar({ events, buttons }: Props) {
  const [currentMonth, setCurrentMonth] = React.useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const defaultButtons = [
    <AppButton
      key="today"
      onClick={() => setCurrentMonth({ month: new Date().getMonth(), year: new Date().getFullYear() })}
    >
      Wróć do obecnego miesiąca
    </AppButton>,
  ];
  function handleMonthChange(delta: 1 | -1) {
    const newYear = currentMonth.year;
    const newMonth = currentMonth.month + delta;
    if (newMonth < 0) {
      setCurrentMonth({ month: 11, year: newYear - 1 });
      return;
    }
    if (newMonth > 11) {
      setCurrentMonth({ month: 0, year: newYear + 1 });
      return;
    }
    setCurrentMonth({ month: newMonth, year: newYear });
  }

  return (
    <div className="flex flex-col p-4 gap-4">
      <div className="flex justify-center items-center w-full">
        <AppButton variant="plain" onClick={() => handleMonthChange(-1)}>
          <ChevronLeft className="w-8 h-8" />
        </AppButton>
        <AppMonthPickerPopover
          value={currentMonth}
          onChange={setCurrentMonth}
          renderDate={({ month, year }) => (
            <div className="text-2xl text-center w-50">
              {months[month]} {year}
            </div>
          )}
        />

        <AppButton variant="plain" onClick={() => handleMonthChange(1)}>
          <ChevronRight className="w-8 h-8" />
        </AppButton>
      </div>
      <div className="flex justify-end flex-wrap gap-4 my-4">{buttons?.(defaultButtons) ?? defaultButtons}</div>
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <div key={day} className="text-center truncate">
            {day}
          </div>
        ))}
        {getDaysInMonth(currentMonth).map((date) => (
          <AppCalendarTile
            date={date}
            eventsWithRows={assignEventsToRows(events)}
            currentMonth={currentMonth}
            key={date.toString()}
          />
        ))}
      </div>
    </div>
  );
}

function getDaysInMonth({ month, year }: { month: number; year: number }): Date[] {
  const date = findClosestMondayBefore(new Date(year, month, 1));
  const days = [];
  while (
    month > 0
      ? date.getFullYear() <= year && date.getMonth() <= month
      : date.getFullYear() < year || date.getMonth() < 1
  ) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  while (date.getDay() > 1 || date.getDay() < 1) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function findClosestMondayBefore(date: Date): Date {
  const day = date.getDay();
  const diff = day === 0 ? 6 : day - 1;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - diff);
}

function assignEventsToRows(events: CalendarEvent[]): CalendarEventWithRow[] {
  const eventsWithRows = events.map((event) => ({ ...event, row: 0 }));
  eventsWithRows.sort((a, b) => a.start.getTime() - b.start.getTime());
  for (let i = 0; i < eventsWithRows.length; i++) {
    const event = eventsWithRows[i];
    let row = 0;
    while (eventsWithRows.slice(0, i).some((other) => other.row === row && isOverlapping(event, other))) {
      row++;
    }
    eventsWithRows[i].row = row;
  }
  return eventsWithRows;
}

function isOverlapping(a: CalendarEvent, b: CalendarEvent): boolean {
  return dateToUtcDay(a.start) < dateToUtcDay(b.end) && dateToUtcDay(a.end) > dateToUtcDay(b.start);
}
