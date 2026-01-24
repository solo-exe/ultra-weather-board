import { locations } from "@/constants"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import type { Dispatch, SetStateAction } from "react"

type Props = {
    location: string
    setLocation: Dispatch<SetStateAction<string>>
}

const LocationDropdown = ({ location, setLocation }: Props) => {
    return (
        <div className="flex justify-center">
            <Select value={location} onValueChange={(value) => setLocation(value)}>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Pick a location" />
                </SelectTrigger>
                <SelectContent className="z-1001">
                    <SelectGroup>
                        <SelectLabel>Locations</SelectLabel>
                        {location === "custom" && <SelectItem value="custom">Custom</SelectItem>}
                        {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                                {location}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default LocationDropdown
