import { Fragment, useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer';
import MovieDetails from "./MovieDetails";
import MovieCard from "./MovieCard";
import { Skeleton } from "@/components/ui/skeleton";
import Loader from "./skeleton";


const MoviesList = ({data, hasNextPage, fetchNextPage, isFetchingNextPage, status} : any) => {
  const { ref, inView } = useInView();
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [SelectedMovie, setSelectedMovie] = useState<number | undefined>()
  

  const openDialog = (movieId: number) => {
    setSelectedMovie(movieId)
    setIsDialogOpen(true)
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    
  }, [inView, hasNextPage]);

  return (
    <>
      <div className="w-11/12 flex mx-auto flex-row flex-wrap justify-center gap-5">
      <MovieDetails 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        movieId={SelectedMovie}
      />
        {
          (status ==='pending') &&
          <Loader />
        }
        {
          (status === 'error') &&
          <div>Error: could not fetch movies </div>
        }
        {
          (status === 'success') && 
            <>
              {data.pages.map((page:any, i:number) => (
                <Fragment key={i}>
                  {
                    page?.results.map((movie:any, index:number) => (
                      <MovieCard
                        key={index}
                        movie={movie}
                        openDialog={openDialog}
                      />
                    ))
                  }
                </Fragment>
              ))}
              <div className="mx-auto w-11/12 flex justify-center" ref={ref}>
                {
                (hasNextPage && isFetchingNextPage) && (
                  <div className="flex flex-row gap-5">
                    <div className="flex flex-col space-y-3 ">
                      <Skeleton className="h-[350px] w-[250px] lg:w-[320px] rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px] lg:w-[320px]" />
                        <Skeleton className="h-4 w-[175px] lg:w-[250px]" />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-3">
                      <Skeleton className="h-[350px] w-[250px] lg:w-[320px] rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px] lg:w-[320px]" />
                        <Skeleton className="h-4 w-[175px] lg:w-[250px]" />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-3">
                      <Skeleton className="h-[350px] w-[250px] lg:w-[320px] rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px] lg:w-[320px]" />
                        <Skeleton className="h-4 w-[175px] lg:w-[250px]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          }
        </div>
    </>
  )
}

export default MoviesList