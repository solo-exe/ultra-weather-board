import { mapTypeList } from "@/constants"
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
import type { MapType } from "@/types"

type Props = {
    mapType: MapType
    setMapType: Dispatch<SetStateAction<MapType>>
}

const MapTypeDropdown = ({ mapType, setMapType }: Props) => {
    return (
        <div className="flex justify-center">
            <Select value={mapType} onValueChange={(value) => setMapType(value as MapType)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pick a map type" />
                </SelectTrigger>
                <SelectContent className="z-1001">
                    <SelectGroup>
                        <SelectLabel>Map Types</SelectLabel>
                        {mapTypeList.map((type) => (
                            <SelectItem className="capitalize" key={type.key} value={type.key}>
                                {type.value}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default MapTypeDropdown
