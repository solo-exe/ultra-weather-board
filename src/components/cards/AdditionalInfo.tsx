import type React from "react"
import Card from "./Card"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getWeather } from "../../api"

const rows = [
    { label: "Cloudiness (%)", value: "clouds" },
    { label: "UV index", value: "uvi" },
    { label: "Wind Direction", value: "wind_deg" },
    { label: "Pressure (Pa)", value: "pressure" },
    { label: "Sunrise", value: "sunrise" },
    { label: "Sunset", value: "sunset" },
] as const

const FormatComponent: React.FC<{ value: string; number: number }> = ({ value, number }) => {
    if (value === "sunrise" || value === "sunset") {
        return new Date(number * 1000).toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
    }
    return number
}

const AdditionalInfo = () => {
    const { data } = useSuspenseQuery({
        queryKey: ["weather"],
        queryFn: async () => await getWeather({ lat: 6.547329, lon: 3.393668 }),

        refetchOnWindowFocus: false,
        retry: false,
        retryOnMount: false,
        refetchOnReconnect: false,
    })

    return (
        <Card title="Additional Weather Info" childrenClassname="flex flex-col gap-8">
            {rows.map(({ label, value }) => (
                <div key={value} className="flex justify-between">
                    <span className="text-gray-500">{label}</span>
                    <span>
                        <FormatComponent value={value} number={data.current[value]} />
                    </span>
                </div>
            ))}
        </Card>
    )
}

export default AdditionalInfo
