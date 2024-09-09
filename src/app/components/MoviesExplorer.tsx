import { useCallback, useState } from "react"
import MoviesList from "./MoviesList"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { debounce } from "lodash"
import Loader from "./skeleton"

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

    const {data: searchData,
        hasNextPage:searchHasNextPage,
        fetchNextPage: searchFetchNextPage,
        isFetchingNextPage: searchIsFetchingNextPage,
        status:searchStatus
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

    const handleSearch = (e: { target: { value: string } }) => {
        const text = e.target.value
        debounced(text)
    }

  return (
    <div className="w-full p-0 flex flex-col items-center min-h-screen bg-background">
      <h1 className='text-5xl text-center font-extrabold my-8'>
        <span className='relative inline-block'>
          <span className='absolute top-[-4px] right-[-4px] text-rose-800 text-7xl -z-0'>M</span>
          <span className='relative text-rose-600 text-7xl z-20'>M</span>
        </span>OVIES <span className='text-rose-600'>E</span>XPLORER
      </h1>
        <div className="mb-12 py-4 w-full bg-[#0c2238] flex justify-center">
            <Input type="search"
                placeholder="Search for a movie"
                className="rounded-xl text-slate-300 w-1/2 bg-[#233a50] border-background border-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={handleSearch}
             />
        </div>
        <div className="mx-auto w-11/12 flex justify-center">
          {
            query.length ?
              searchData ?
              <MoviesList
                data={searchData}
                hasNextPage={searchHasNextPage}
                fetchNextPage={searchFetchNextPage}
                isFetchingNextPage={searchIsFetchingNextPage}
                status={searchStatus}
              />
              :
              <Loader />
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
    </div>
  )
}

export default MoviesExplorer