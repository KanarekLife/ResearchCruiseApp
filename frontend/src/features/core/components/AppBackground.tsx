import { cn } from '@lib/utils';
import ImageUrl from '@assets/background.jpg';

/**
 * Component showing the background image of the app.
 */
export default function AppBackground() {
  return (
    <div
      className={cn(
        'absolute h-full w-full bg-[image:var(--bg)] bg-repeat -z-50 bg-center'
      )}
      style={{ '--bg': `url('${ImageUrl}')` } as React.CSSProperties}
    />
  );
}
