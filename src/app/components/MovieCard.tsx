import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from 'next/image';

const MovieCard = ({movie, openDialog}) => {

    return (
        <Card className="w-[250px] lg:w-[320px] rounded-xl cursor-pointer transform transition-transform duration-300 hover:scale-105"
            onClick={() => { openDialog(movie.id)}}
        >
            <CardContent className="w-full px-0 rounded-t-xl">
                <Image
                    src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-96 object-cover rounded-t-xl"
                    width={500}
                    height={750}
                />
            </CardContent>
            <CardFooter>
                <h3 className="font-bold text-lg text-center">{movie.title}</h3>
            </CardFooter>
        </Card>
    )
}
export default MovieCard