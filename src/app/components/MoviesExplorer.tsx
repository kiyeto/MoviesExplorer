'use client'
import { useCallback, useState } from "react"
import MoviesList from "./MoviesList"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { debounce } from "lodash"

const getMovies = async ({ pageParam }: {pageParam:number}) => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=${pageParam}`,
      headers: {
        accept: 'application/json',
      }
    }
    try {
      const response = await axios.request(options)
      return response.data
  
    }
    catch (err) {
        throw new Error('Failed to fetch movies, try again later ' + err)
    }
  }

  const searchforMovies = async (query: string, pageParam: number) => {
    const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}&language=en-US&page=${pageParam}`,
        headers: {
          accept: 'application/json',
        }
    }
    try {
        const response = await axios.request(options)
        return response.data
    } catch (e) {
        throw new Error(`Error: ${e}`)
    }
}

const MoviesExplorer = () => {
    const [query, setQuery] = useState('')
    const { data, hasNextPage, fetchNextPage, isFetchingNextPage, status } = useInfiniteQuery({
        queryKey: ['movies'],
        queryFn: getMovies,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.page + 1
      })

    const {data: data2,
        hasNextPage:hasNextPage2,
        fetchNextPage: fetchNextPage2,
        isFetchingNextPage: isFetchingNextPage2,
        status:status2
    } = useInfiniteQuery({
        queryKey: ['movieSearch', query],
        queryFn: ({pageParam = 1}) => searchforMovies(query, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.page + 1,
        enabled: query.length > 0
      })
  
    const debounced = useCallback(
        debounce((newquery) => setQuery(newquery), 300)
    ,[])

    const handleSearch = (e: { target: { value: any } }) => {
        const text = e.target.value
        debounced(text)
    }
  return (
    <div className="w-full p-5 flex flex-col justify-center items-center min-h-screen bg-background">
        <div className="mb-12 w-1/2">
            <Input type="search"
                placeholder="Search for a movie"
                className="border rounded-xl"
                onChange={handleSearch}
             />
        </div>
        {
            data2 ?
            <MoviesList
                data={data2}
                hasNextPage={hasNextPage2}
                fetchNextPage={fetchNextPage2}
                isFetchingNextPage={isFetchingNextPage2}
                status={status2}
            />
            :
            <MoviesList
                data={data}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
                status={status}
            /> 
        }
    </div>
  )
}

export default MoviesExplorer