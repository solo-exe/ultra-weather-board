import { Skeleton } from "@/components/ui/skeleton"

import Card from "../cards/Card"

const CurrentSkeleton = () => {
    return (
        <Card title="Current Weather" childrenClassname="flex flex-col items-center gap-6">
            <div className="flex flex-col gap-2 items-center">
                <Skeleton className="w-30 h-15" />
                <Skeleton className="size-14 rounded-full" />
                <Skeleton className="w-36 h-7" />
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-xl text-center">Local TIme</p>
                <Skeleton className="w-36 h-10" />
            </div>

            <div className="flex justify-between w-full">
                <div className="flex flex-col gap-2 items-center">
                    <p className="text-gray-500">Feels Like</p>
                    <Skeleton className="h-6 w-16" />
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <p className="text-gray-500">Humidity</p>
                    <Skeleton className="h-6 w-16" />
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <p className="text-gray-500">Wind Speed</p>
                    <Skeleton className="h-6 w-16" />
                </div>
            </div>
        </Card>
    )
}

export default CurrentSkeleton
