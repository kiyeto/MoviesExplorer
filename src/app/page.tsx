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
        <div>
          <h1 className='text-5xl text-center font-bold my-4'> Movies Explorer </h1>
          <MoviesExplorer />
        </div>
      </QueryClientProvider>
    </>
  );
}
