import { Skeleton } from "../ui/skeleton"
import Card from "../cards/Card"

const HourlySkeleton = () => {
    return (
        <Card title="Hourly Forecast (48 Hours)" childrenClassname="flex gap-6 overflow-x-scroll">
            {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2 items-center p-2">
                    <p className="whitespace-nowrap">
                        {new Date(i * 1000).toLocaleTimeString(undefined, {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                        })}
                    </p>
                    <Skeleton className="size-8 rounded-full" />
                    <Skeleton className="w-16 h-6" />
                </div>
            ))}
        </Card>
    )
}

export default HourlySkeleton
