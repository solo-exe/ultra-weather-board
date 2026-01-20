import { Skeleton } from "@/components/ui/skeleton"
import Card from "../cards/Card"

const DailySkeleton = () => {
    return (
        <Card title="Daily Forecast (8 Days)" childrenClassname="flex flex-col gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                    <Skeleton className="w-30 h-6" />
                    <Skeleton className="size-8 rounded-full" />
                    <Skeleton className="w-16 h-6" />
                    <Skeleton className="w-16 h-6" />
                    <Skeleton className="w-16 h-6" />
                </div>
            ))}
        </Card>
    )
}

export default DailySkeleton
