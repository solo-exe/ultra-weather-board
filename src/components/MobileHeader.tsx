import type { Dispatch, SetStateAction } from "react"
import HamburgerSVG from "../assets/hamburger.svg?react"
import LightDarkToggle from "./LightDarkToggle"

type Props = {
    setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>
}

const MobileHeader = ({ setIsSidePanelOpen }: Props) => {
    return (
        <div className="w-full h-16 p-4 bg-background sticky top-0 sm:hidden flex justify-end z-1001 gap-8">
            <LightDarkToggle />

            <button onClick={() => setIsSidePanelOpen(true)}>
                <HamburgerSVG className="size-6" />
            </button>
        </div>
    )
}

export default MobileHeader
