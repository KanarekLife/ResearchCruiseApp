import { createBrowserHistory, createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from '../../../routeTree.gen';
import { useContext } from 'react';
import { UserContext } from '@core/contexts/UserContext';

const router = createRouter({
  routeTree,
  context: {
    userContext: undefined,
  },
  history: createBrowserHistory(),
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function RouterWithUserContextProvider() {
  const userContext = useContext(UserContext);

  return <RouterProvider router={router} context={{ userContext }} />;
}
