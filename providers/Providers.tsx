'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1A1A1A',
            color: '#FAF8F5',
            fontSize: '14px',
            borderRadius: '2px',
            padding: '12px 16px',
          },
          success: {
            iconTheme: { primary: '#C9A96E', secondary: '#FAF8F5' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#FAF8F5' },
          },
        }}
      />
    </QueryClientProvider>
  );
}
