import { createFileRoute } from '@tanstack/react-router';
import { CruiseEffectsPage } from '@/cruise-applications/pages/CruiseEffectsPage';

export const Route = createFileRoute('/cruiseeffects')({
  component: CruiseEffectsPage,
});
