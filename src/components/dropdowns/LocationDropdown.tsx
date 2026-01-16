import { locations } from "@/constants"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const LocationDropdown = () => {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Location" />
            </SelectTrigger>
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
