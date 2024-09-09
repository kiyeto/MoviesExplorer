'use client'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import MoviesExplorer from './components/MoviesExplorer';

const queryClient = new QueryClient()

export default function Home() {
 
  return (
    <>
      <QueryClientProvider client={queryClient}>
          <MoviesExplorer />
      </QueryClientProvider>
    </>
  );
}
