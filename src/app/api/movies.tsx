import axios from "axios"

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
})

export const getMovies = async ({ pageParam }: {pageParam: number}) => {
    try {
        const response = await api.get(`/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=${pageParam}`, {
            headers: {
                accept: 'application/json',
            }
        })
      return response.data
    }
    catch (err) {
        throw new Error('Failed to fetch movies, try again later ' + err)
    }
}


export const searchforMovies = async (query: string, pageParam: number) => {
    try {
        const response = await api.get(`/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}&language=en-US&page=${pageParam}`, {
            headers: {
                accept: 'application/json',
            }
        })
        return response.data
    } catch (e) {
        throw new Error(`Error: ${e}`)
    }
}


export const getMovieDetails = async (id: number) => {
    try {
        const response = await api.get(`/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, {
            headers: {
                accept: 'application/json'
            }
        })
        return response.data
    }
    catch (err){
        throw new Error('Failed to fetch movie details, try again later ' + err)
    }
}