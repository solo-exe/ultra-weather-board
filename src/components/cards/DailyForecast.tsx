import Card from "./Card"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getWeather } from "../../api"
import WeatherIcon from "../WeatherIcon"
import type { Coords } from "../../types"

type Props = { coords: Coords; apiKey?: string }

const DailyForecast = ({ coords, apiKey }: Props) => {
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
            title="Daily Forecast (8 Days)"
            childrenClassname="flex flex-col gap-4 xl:justify-between"
        >
            {data?.daily?.map((day) => (
                <div key={day.dt} className="flex justify-between">
                    <p className="grow w-30">
                        {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                        })}
                    </p>
                    <WeatherIcon icon={day.weather[0].icon} className="grow max-w-10" />
                    <div className="flex justify-between w-1/2 ">
                        <p className="px-2">{Math.round(day.temp.day) + "°C"}</p>
                        <p className="text-gray-500/75 px-2">{Math.round(day.temp.min) + "°C"}</p>
                        <p className="text-gray-500/75 px-2">{Math.round(day.temp.max) + "°C"}</p>
                    </div>
                </div>
            ))}
        </Card>
    )
}

export default DailyForecast
