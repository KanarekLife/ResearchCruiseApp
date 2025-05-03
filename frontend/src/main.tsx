import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppContextProvider } from '@/core/providers/AppContextProvider';
import CustomRouterProvider from '@/core/providers/CustomRouterProvider';
import { initializeFaro } from '@/monitoring/lib/grafanaFaro';
import { UserContextProvider } from '@/user/providers/UserContextProvider';

initializeFaro();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <UserContextProvider>
        <AppContextProvider>
          <CustomRouterProvider />
        </AppContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
