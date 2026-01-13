import Card from "./Card"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getWeather } from "../../api"
import WeatherIcon from "../WeatherIcon"

const DailyForecast = () => {
    const { data } = useSuspenseQuery({
        queryKey: ["weather"],
        queryFn: async () => await getWeather({ lat: 6.547329, lon: 3.393668 }),

        refetchOnWindowFocus: false,
        retry: false,
        retryOnMount: false,
        refetchOnReconnect: false,
    })

    return (
        <Card title="Daily Forecast (8 Days)" childrenClassname="flex flex-col gap-4">
            {data.daily.map((day) => (
                <div key={day.dt} className="flex justify-between">
                    <p className="w-30">
                        {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                        })}
                    </p>
                    <WeatherIcon
                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    />
                    <p>{Math.round(day.temp.day) + "°C"}</p>
                    <p className="text-gray-500/75">{Math.round(day.temp.min) + "°C"}</p>
                    <p className="text-gray-500/75">{Math.round(day.temp.max) + "°C"}</p>
                </div>
            ))}
        </Card>
    )
}

export default DailyForecast
