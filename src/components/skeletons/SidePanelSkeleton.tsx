import { Slider } from "@radix-ui/react-slider"
import InformationSVG from "../../assets/information.svg?react"
import Card from "../cards/Card"
import { Skeleton } from "../ui/skeleton"
import clsx from "clsx"

const AirPollutionSkeleton = () => {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Air Pollution</h1>
            <h1 className="text-5xl font-semibold">
                <Skeleton className="w-8 h-12" />
            </h1>
            <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold">AQI</h1>
                <InformationSVG className="size-4 invert" />
            </div>

            {Array.from({ length: 8 }).map((_, i) => {
                return (
                    <Card
                        childrenClassname="flex flex-col gap-3"
                        key={i}
                        className="hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60 gap-0!"
                    >
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold capitalize">
                                    <Skeleton className="w-16 h-5" />
                                </span>
                                <Skeleton className="w-4 h-4" />
                            </div>
                            <span className="text-lg font-semibold">
                                <Skeleton className="w-12 h-5" />
                            </span>
                        </div>

                        <Slider disabled min={0} max={100} value={[100]} />
                        <div className="flex justify-between text-xs">
                            <Skeleton className="w-4 h-3" />
                            <Skeleton className="w-8 h-3" />
                        </div>
                        <div className="flex justify-between">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span
                                    className={clsx(
                                        "px-2 py-1 rounded-md text-15px font-medium",
                                        "bg-muted text-muted-foreground",
                                    )}
                                    key={i}
                                >
                                    <Skeleton className="w-5 h-4" />
                                </span>
                            ))}
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}

export default AirPollutionSkeleton
