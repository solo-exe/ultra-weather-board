import { type ReactNode } from "react"

type Props = {
    children: ReactNode
}

const Card = ({ children }: Props) => {
    return (
        <div className="p-4 rounded-xl bg-zinc-900">
            <div>{children}</div>
        </div>
    )
}

export default Card
