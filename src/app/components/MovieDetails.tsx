import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from 'next/image'
import { Skeleton } from "@/components/ui/skeleton"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";

const getMovieDetails = async (id: number) => {
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        headers: {
            accept: 'application/json'
        }
    };
    try {
        const response = await axios.request(options)
        return response.data
    }
    catch (err){
        throw new Error('Failed to fetch movie details, try again later ' + err)
      }
}

const MovieDetails = ({ isOpen, onClose, movieId} : {
    isOpen: boolean | undefined,
    onClose:(open: boolean) => void,
    movieId: number | undefined}
)=> {

    const { data, isPending, isError, error, isSuccess } = useQuery({
        queryKey:['movie', movieId],
        queryFn: () => getMovieDetails(movieId!),
        enabled: movieId !== undefined
    })

return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-full w-10/12 max-md:h-[80%] p-0 border-none rounded-xl" aria-describedby={undefined}>
        <DialogTitle className="hidden"></DialogTitle>
            {isPending &&
                <div className="w-full min-h-[780px] flex flex-col space-y-3 px-4 py-5 justify-center items-center">
                    <Skeleton className="h-[350px] w-11/12 rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div> 
            }
            {isError && 
                <div>Error: {error.message}</div>
            }
            {isSuccess && (
                <>
                    <div className="relative w-full overflow-hidden">
                        <div className="w-full h-[100vh] sm:h-[80vh] md:h-[50vh] lg:h-[60vh] relative">
                            <Image
                                src={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`}
                                alt={data.title}
                                fill={true}
                                className="rounded-xl object-cover bg-center"
                            />
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-70 rounded-xl"></div>
                        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-8 lg:p-10 text-white">
                            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 mb-4">
                                <Image
                                    src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
                                    alt={data.title}
                                    width={120}
                                    height={180}
                                    className="rounded-lg shadow-lg"
                                />
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{data.title}</h1>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                <h2 className='text-xl font-bold italic mb-2'>Storyline: </h2>
                                <p className="text-sm sm:text-base">{data.overview ? data.overview : 'No storyline available.'}</p>
                                </div>
                                <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <h2 className='text-lg font-bold italic'>Release date: </h2> 
                                    <span className="text-sm sm:text-base">{ data.release_date ? data.release_date : 'Not available' }</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <h2 className='text-lg font-bold italic'>Runtime: </h2> 
                                    <span className="text-sm sm:text-base">{data.runtime ? `${data.runtime} minutes` : 'Not available'}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <h2 className='text-lg font-bold italic'>Average rating: </h2>
                                    <span className="text-sm sm:text-base flex items-center">
                                        <FontAwesomeIcon className='mr-2 text-yellow-300' icon={faStar} />
                                        {data.vote_average.toFixed(1)}
                                    </span>
                                </div>
                                <div>
                                    <h2 className='text-lg font-bold italic mb-2'>Genres: </h2>
                                    <div className='flex flex-wrap gap-2'>
                                    {data.genres.map((genre:any) => (
                                        <span key={genre.id} className='px-2 py-1 bg-gray-700 bg-opacity-50 border border-1 border-white rounded-full text-xs sm:text-sm'>
                                        {genre.name}
                                        </span> 
                                    ))}
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            
        </DialogContent>
    </Dialog>
)
}

export default MovieDetails