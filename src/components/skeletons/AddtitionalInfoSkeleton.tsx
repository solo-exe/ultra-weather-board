import Card from "../cards/Card"
import { Skeleton } from "../ui/skeleton"

const AddtitionalInfoSkeleton = () => {
    return (
        <Card title="Additional Weather Info" childrenClassname="flex flex-col gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                    <div className="flex gap-4">
                        <Skeleton className="w-30 h-6" />
                        <Skeleton className="w-5 h-6 rounded-full" />
                    </div>
                    <span>
                        <Skeleton className="w-30 h-6" />
                    </span>
                </div>
            ))}
        </Card>
    )
}

export default AddtitionalInfoSkeleton
