import type React from "react"
import Card from "./Card"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getWeather } from "../../api"

import SunriseSVG from "../../assets/sunset.svg?react"
import SunsetSVG from "../../assets/sunset.svg?react"
import CloudSVG from "../../assets/cloud.svg?react"
import PressureSVG from "../../assets/pressure.svg?react"
import UvSVG from "../../assets/uv.svg?react"
import WindSVG from "../../assets/wind.svg?react"
import UpArrowSVG from "../../assets/uparrow.svg?react"
import type { Coords } from "../../types"

const rows = [
    {
        label: "Cloudiness (%)",
        value: "clouds",
        Icon: CloudSVG,
    },
    {
        label: "UV index",
        value: "uvi",
        Icon: UvSVG,
    },
    {
        label: "Wind Direction",
        value: "wind_deg",
        Icon: WindSVG,
    },
    {
        label: "Pressure (Pa)",
        value: "pressure",
        Icon: PressureSVG,
    },
    {
        label: "Sunrise",
        value: "sunrise",
        Icon: SunriseSVG,
    },
    {
        label: "Sunset",
        value: "sunset",
        Icon: SunsetSVG,
    },
] as const

const FormatComponent: React.FC<{ value: string; number: number }> = ({ value, number }) => {
    if (value === "sunrise" || value === "sunset") {
        return new Date(number * 1000).toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
    }
    if (value === "wind_deg")
        return (
            <UpArrowSVG style={{ transform: `rotate(${number}deg)` }} className="size-6 invert" />
        )
    return number
}

type Props = { coords: Coords; apiKey?: string }

const AdditionalInfo = ({ coords, apiKey }: Props) => {
    const { lat, lon } = coords
    const { data } = useSuspenseQuery({
        queryKey: ["weather", coords],
        queryFn: async () => await getWeather({ lat, lon, apiKey }),

        refetchOnWindowFocus: false,
        retry: false,
        retryOnMount: false,
        refetchOnReconnect: false,
    })

    return (
        <Card
            title="Additional Weather Info"
            childrenClassname="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
            {rows.map(({ label, value, Icon }) => (
                <div key={value} className="flex flex-col sm:flex-row justify-between">
                    <div className="flex gap-4">
                        <span className="text-gray-500">{label}</span>
                        <Icon className="size-8 invert" />
                    </div>
                    <span>
                        <FormatComponent value={value} number={data?.current?.[value] || 0} />
                    </span>
                </div>
            ))}
        </Card>
    )
}

export default AdditionalInfo
