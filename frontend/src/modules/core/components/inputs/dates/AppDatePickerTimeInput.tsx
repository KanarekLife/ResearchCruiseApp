import { cn } from '@/core/lib/utils';

type Props = {
  selectedDate?: Date;
  onChange: (date: Date) => void;
  minuteStep?: number;
};
export function AppDatePickerTimeInput({ selectedDate, onChange, minuteStep = 1 }: Props) {
  if (60 % minuteStep !== 0) {
    throw new Error('minuteStep must be a divisor of 60');
  }
  if (selectedDate === undefined) {
    selectedDate = new Date();
  }

  if (minuteStep > 15) {
    return (
      <div className="text-center px-16 pb-4">
        Wybierz godzinę:
        <div className="h-20 overflow-x-scroll border border-gray-300 rounded-lg">
          {Array.from({ length: 24 }, (_, hour) => {
            return Array.from({ length: 60 / minuteStep }, (_, index) => {
              const minute = index * minuteStep;
              const dateString = `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`;
              return (
                <div
                  key={dateString}
                  className={cn(
                    selectedDate?.getHours() === hour && selectedDate.getMinutes() === minute
                      ? '!bg-primary-500 text-white'
                      : '',
                    'odd:bg-gray-100'
                  )}
                  onClick={() => {
                    onChange(new Date(selectedDate?.setHours(hour, minute, 0, 0) ?? 0));
                  }}
                >
                  {dateString}
                </div>
              );
            });
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center justify-between px-8 pb-4 gap-8">
      <div className="w-full text-center ">
        Wybierz godzinę:
        <div className="h-20 overflow-x-scroll border border-gray-300 rounded-lg">
          {Array.from({ length: 24 }, (_, hour) => (
            <div
              key={hour}
              className={cn(selectedDate?.getHours() === hour ? '!bg-primary-500 text-white' : '', ' odd:bg-gray-100')}
              onClick={() => {
                onChange(new Date(selectedDate?.setHours(hour, selectedDate.getMinutes(), 0, 0) ?? 0));
              }}
            >
              {hour < 10 ? `0${hour}` : hour}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full text-center">
        Wybierz minutę:
        <div className="h-20 overflow-x-scroll border border-gray-300 rounded-lg">
          {Array.from({ length: 60 / minuteStep }, (_, index) => {
            const minute = index * minuteStep;
            return (
              <div
                key={minute}
                className={cn(
                  selectedDate?.getMinutes() === minute ? '!bg-primary-500 text-white' : '',
                  'odd:bg-gray-100'
                )}
                onClick={() => {
                  onChange(new Date(selectedDate?.setMinutes(minute, 0, 0) ?? 0));
                }}
              >
                {minute < 10 ? `0${minute}` : minute}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
