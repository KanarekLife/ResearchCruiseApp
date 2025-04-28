import config from '@config';
import packageJson from 'package.json';

import { AppLink } from '@/core/components/AppLink';
import { cn } from '@/core/lib/utils';

export function AppVersion() {
  const position = config.dev ? 'bottom-5 right-25' : 'bottom-2.5 right-2.5';

  return (
    <div className={cn('fixed text-gray-200', position)}>
      Portal Rejsów Badawczych R/V Oceanograf{' '}
      <AppLink href={`${packageJson.repository}/releases/latest`} variant="white">
        {packageJson.version}
      </AppLink>
    </div>
  );
}
