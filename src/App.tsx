// import { useQuery } from "@tanstack/react-query"
// import { getWeather } from "./api"
import DailyForecast from "./components/cards/DailyForecast"
import HourlyForecast from "./components/cards/HourlyForecast"
import CurrentWeather from "./components/cards/CurrentWeather"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import Map from "./components/Map"
import { Suspense, useState } from "react"
import type { Coords } from "./types"
import { getGeocode } from "./api"
import { useQuery } from "@tanstack/react-query"
import LocationDropdown from "./components/dropdowns/LocationDropdown"
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown"
import MapLegend from "./components/MapLegend"
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton"
import DailySkeleton from "./components/skeletons/DailySkeleton"
import HourlySkeleton from "./components/skeletons/HourlySkeleton"
import AddtitionalInfoSkeleton from "./components/skeletons/AddtitionalInfoSkeleton"

function App() {
    const [coordinates, setCoords] = useState<Coords>({ lat: 10, lon: 25 })
    const [location, setLocation] = useState("")
    const [mapType, setMapType] = useState("clouds_new")

    const { data: geocodeData } = useQuery({
        queryKey: ["geocode", location],
        queryFn: () => getGeocode({ location }),
    })

    const onMapClick = (lat: number, lon: number) => {
        setCoords({ lat, lon })
        setLocation("custom")
    }

    const coords =
        location === "custom"
            ? coordinates
            : {
                  ...(geocodeData
                      ? { lat: geocodeData[0].lat, lon: geocodeData[0].lon }
                      : { lat: 0, lon: 0 }),
              }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-center gap-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-center font-bold">Location</h1>
                    <LocationDropdown location={location} setLocation={setLocation} />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-center font-bold">Map Type</h1>
                    <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
                </div>
            </div>
            <div className="relative">
                <Map
                    coords={coords}
                    onMapClick={(lat, lon) => onMapClick(lat, lon)}
                    mapType={mapType}
                />
                <MapLegend mapType={mapType} />
            </div>
            <Suspense fallback={<CurrentSkeleton />}>
                <CurrentWeather coords={coords} />
            </Suspense>
            <Suspense fallback={<HourlySkeleton />}>
                <HourlyForecast coords={coords} />
            </Suspense>
            <Suspense fallback={<DailySkeleton />}>
                <DailyForecast coords={coords} />
            </Suspense>
            <Suspense fallback={<AddtitionalInfoSkeleton />}>
                <AdditionalInfo coords={coords} />
            </Suspense>
        </div>
    )
}

export default App
