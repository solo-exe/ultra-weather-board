import { useSuspenseQuery } from "@tanstack/react-query"
import { getWeather } from "../../api"
import Card from "./Card"
import WeatherIcon from "../WeatherIcon"

const HourlyForcast = () => {
    const { data } = useSuspenseQuery({
        queryKey: ["weather"],
        queryFn: async () => await getWeather({ lat: 6.547329, lon: 3.393668 }),

        refetchOnWindowFocus: false,
        retry: false,
        retryOnMount: false,
        refetchOnReconnect: false,
    })

    return (
        <Card title="Hourly Forecast (48 Hours)" childrenClassname="flex gap-6 overflow-x-scroll">
            {data.hourly.map((hour) => (
                <div className="flex flex-col gap-2 items-center p-2">
                    <p className="whitespace-nowrap">
                        {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                        })}
                    </p>
                    <WeatherIcon icon={hour.weather[0].icon} />
                    <p>{Math.round(hour.temp)}°C</p>
                </div>
            ))}
        </Card>
    )
}

export default HourlyForcast
