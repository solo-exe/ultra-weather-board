import { locations } from "@/constants"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import type { Dispatch, SetStateAction } from "react"

type Props = {
    location: string
    setLocation: Dispatch<SetStateAction<string>>
}

const LocationDropdown = ({ location, setLocation }: Props) => {
    return (
        <Select value={location} onValueChange={(value) => setLocation(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Location" />
            </SelectTrigger>
            <br></br>
            <SelectContent className="z-1001">
                {locations.map((location) => (
                    <SelectItem key={location.place} value={location.place}>
                        {location.place}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default LocationDropdown
