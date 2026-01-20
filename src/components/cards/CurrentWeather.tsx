import { useSuspenseQuery } from "@tanstack/react-query"
import { getWeather } from "../../api"
import Card from "./Card"
import WeatherIcon from "../WeatherIcon"
import type { Coords } from "../../types"

const CurrentWeather = ({ coords }: { coords: Coords }) => {
    const { lat, lon } = coords
    const { data } = useSuspenseQuery({
        queryKey: ["weather", coords],
        queryFn: async () => await getWeather({ lat, lon }),

        refetchOnWindowFocus: false,
        retry: false,
        retryOnMount: false,
        refetchOnReconnect: false,
    })

    return (
        <Card title="Current Weather" childrenClassname="flex flex-col items-center gap-6">
            <div className="flex flex-col gap-2 items-center">
                <h2 className="text-6xl font-semibold text-center">
                    {Math.round(data?.current?.temp || 0) + "°C"}
                </h2>
                <WeatherIcon icon={data?.current?.weather[0].icon || ""} className="size-14" />
                <h3 className="capitalize text-xl">{data?.current?.weather[0].description}</h3>
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-xl text-center">Local TIme</p>
                <h3 className="text-4xl font-semibold">
                    {new Intl.DateTimeFormat("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                        timeZone: data?.timezone,
                    }).format((data?.current?.dt ?? 0) * 1000)}
                </h3>
            </div>

            <div className="flex justify-between w-full">
                <div className="flex flex-col gap-2 items-center">
                    <p className="text-gray-500">Feels Like</p>
                    <p>{Math.round(data?.current?.feels_like ?? 0) + "°C"}</p>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <p className="text-gray-500">Humidity</p>
                    <p>{Math.round(data?.current?.humidity ?? 0) + "%"}</p>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <p className="text-gray-500">Wind Speed</p>
                    <p>{Math.round(data?.current?.wind_speed ?? 0) + "m/s"}</p>
                </div>
            </div>
        </Card>
    )
}

export default CurrentWeather
