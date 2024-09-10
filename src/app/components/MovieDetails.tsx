import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../api/movies";
import Image from 'next/image'
import { Skeleton } from "@/components/ui/skeleton"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { DialogTitle } from "@radix-ui/react-dialog";

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
        <DialogContent className="max-w-full w-10/12 min-h-[650px] p-0 border-0 rounded-xl" aria-describedby={undefined}>
        <DialogTitle className="hidden"></DialogTitle>
            {isPending &&
                <div className="w-full min-h-[750px] flex flex-col space-y-3 px-4 py-5 justify-center items-center">
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
                        <div className="w-full h-full relative">
                            <Image
                                src={process.env.NEXT_PUBLIC_API_IMAGE_BACKDROP + data.backdrop_path}
                                alt={data.title}
                                fill={true}
                                className="rounded-xl object-cover bg-center"
                            />
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-70 rounded-xl"></div>
                        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-8 lg:p-10 text-white">
                            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 mb-4">
                                <Image
                                    src={process.env.NEXT_PUBLIC_API_IMAGE_POSTER + data.poster_path}
                                    alt={data.title}
                                    width={120}
                                    height={180}
                                    className="rounded-xl shadow-xl"
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
                                <div className="flex justify-between items-center">
                                    <h2 className='text-lg font-bold italic'>Genres: </h2>
                                    <span className='flex flex-wrap gap-2'>
                                    {data.genres.map((genre:any) => (
                                        <span key={genre.id} className='px-2 py-1 bg-gray-700 bg-opacity-50 border border-1 border-rose-600 rounded-full text-xs sm:text-sm'>
                                        {genre.name}
                                        </span> 
                                    ))}
                                    </span>
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