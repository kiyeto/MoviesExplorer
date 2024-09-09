import { Skeleton } from "@/components/ui/skeleton"

const Loader = () => {
  return (
    <>
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
    </>
  )
}

export default Loader