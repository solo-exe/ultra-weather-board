import clsx from "clsx"
import { type ReactNode } from "react"

type Props = {
    children: ReactNode
    title: string
    childrenClassname?: string
}

const Card = ({ children, title, childrenClassname }: Props) => {
    return (
        <div className="p-4 rounded-xl bg-linear-to-br from-card to-card/60 shadow-md flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <div className={clsx(childrenClassname, "animate-[fade-in_1s_ease-out_forwards]")}>
                {children}
            </div>
        </div>
    )
}

export default Card
