import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from 'next/image';

interface Movie {
    poster_path: string,
    title: string,
    id: number
}

const MovieCard = ({movie, openDialog} : {movie:Movie, openDialog:Function}) => {

    return (
        <Card className="w-[250px] lg:w-[320px] rounded-xl border-none cursor-pointer transform transition-transform duration-150 hover:scale-105 drop-shadow-lg group"
            onClick={() => { openDialog(movie.id)}}
        >
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <span className="py-2 px-4 font-bold bg-rose-600 rounded-full">
                    See Movie Details
                </span>
            </div>
            <CardContent className="w-full px-0 rounded-t-xl">
                <Image
                    src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-96 object-cover rounded-t-xl"
                    width={500}
                    height={750}
                />
            </CardContent>
            <CardFooter className="flex justify-center">
                <h3 className="font-bold text-lg text-center">{movie.title}</h3>
            </CardFooter>
        </Card>
    )
}
export default MovieCard