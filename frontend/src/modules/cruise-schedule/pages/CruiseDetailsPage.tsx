import { getRouteApi } from '@tanstack/react-router';

export function CruiseDetailsPage() {
  const { cruiseId } = getRouteApi('/cruises/$cruiseId/').useParams();

  return <div>Cruise info page for cruise with id: {cruiseId}</div>;
}
