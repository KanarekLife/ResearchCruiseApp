import { cn } from '@lib/utils';

type Props = {
  fullName?: string;
  variant?: keyof typeof variants;
  className?: string;
};

export function AppInitialsAvatar({ fullName, variant = 'default', className }: Props) {
  if (!fullName || fullName.split(' ').filter((x) => !!x).length === 0) {
    return null;
  }

  const color = `hsl(${map(
    fullName
      .split(' ')
      .filter((x) => !!x)
      .map((name) => getByteLength(name.charAt(0).toLowerCase()))
      .reduce((a, b) => a / b),
    minRange,
    maxRange,
    0,
    360
  )},50%,50%)`;

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center  overflow-hidden bg-[var(--color)] rounded-full',
        variants[variant],
        className
      )}
      style={{ '--color': color } as React.CSSProperties}
    >
      <span className="text-gray-50 font-bold">
        {fullName
          .split(' ')
          .map((name) => name.charAt(0).toUpperCase())
          .join('')}
      </span>
    </div>
  );
}

const variants = {
  default: 'w-16 h-16 text-2xl',
  small: 'w-10 h-10 text-md',
};

function getByteLength(string: string) {
  return new TextEncoder().encode(string[0])[0];
}

function map(value: number, start1: number, stop1: number, start2: number, stop2: number) {
  return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

const minCharByteValue: number = getByteLength('a');
const maxCharByteValue: number = getByteLength('z');

const minRange: number = minCharByteValue / maxCharByteValue;
const maxRange: number = 1;
