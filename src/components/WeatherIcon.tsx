type Props = {
    src: string
}

const WeatherIcon = ({ src }: Props) => {
    return <img className="size-8" src={src} alt="Weather Icon" />
}

export default WeatherIcon
