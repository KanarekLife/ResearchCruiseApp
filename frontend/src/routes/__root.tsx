import AppBackground from '@core/components/AppBackground';
import { AppHeader } from '@core/components/AppHeader';
import { AppNetworkStatus } from '@core/components/AppNetworkStatus';
import { UserContextType } from '@core/contexts/UserContext';
import { createRootRouteWithContext, Navigate, Outlet, ScrollRestoration } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

type RouterContext = {
  userContext?: UserContextType;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root,
  notFoundComponent: () => <Navigate to="/" />,
});

function Root() {
  return (
    <>
      <div className="sticky top-0 z-100">
        <div className="relative z-100">
          <AppHeader />
        </div>
        <div className="absolute z-90 w-full">
          <AppNetworkStatus />
        </div>
      </div>
      <AppBackground />
      <main className="flex-1">
        <Outlet />
      </main>
      <ScrollRestoration />
      <TanStackRouterDevtools />
    </>
  );
}
