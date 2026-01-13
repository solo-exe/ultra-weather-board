import clsx from "clsx"

type Props = {
    icon: string
    className?: string
}

const WeatherIcon = ({ icon, className }: Props) => {
    return (
        <img
            className={clsx("size-8", className)}
            src={`https://openweathermap.org/img/wn/${icon}.png`}
            alt="Weather Icon"
        />
    )
}

export default WeatherIcon
