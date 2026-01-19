import { mapTypes } from "@/constants"
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
    mapType: string
    setMapType: Dispatch<SetStateAction<string>>
}

const MapTypeDropdown = ({ mapType, setMapType }: Props) => {
    return (
        <div className="flex justify-center">
            <Select value={mapType} onValueChange={(value) => setMapType(value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pick a map type" />
                </SelectTrigger>
                <SelectContent className="z-1001">
                    <SelectGroup>
                        <SelectLabel>Map Types</SelectLabel>
                        {mapTypes.map((mapType) => (
                            <SelectItem key={mapType} value={mapType}>
                                {mapType}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default MapTypeDropdown
