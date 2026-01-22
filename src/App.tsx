// import { useQuery } from "@tanstack/react-query"
// import { getWeather } from "./api"
import DailyForecast from "./components/cards/DailyForecast"
import HourlyForecast from "./components/cards/HourlyForecast"
import CurrentWeather from "./components/cards/CurrentWeather"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import Map from "./components/Map"
import { Suspense, useState } from "react"
import type { Coords, MapType } from "./types"
import { getGeocode } from "./api"
import { useQuery } from "@tanstack/react-query"
import LocationDropdown from "./components/dropdowns/LocationDropdown"
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown"
import MapLegend from "./components/MapLegend"
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton"
import DailySkeleton from "./components/skeletons/DailySkeleton"
import HourlySkeleton from "./components/skeletons/HourlySkeleton"
import AddtitionalInfoSkeleton from "./components/skeletons/AddtitionalInfoSkeleton"
import SidePanel from "./components/SidePanel"
import HamburgerSVG from "./assets/hamburger.svg?react"

function App() {
    const [coordinates, setCoords] = useState<Coords>({ lat: 10, lon: 25 })
    const [location, setLocation] = useState("")
    const [mapType, setMapType] = useState<MapType>("clouds_new")
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(true)
    const [apiKey, setApiKey] = useState<string | undefined>(undefined)

    const { data: geocodeData } = useQuery({
        queryKey: ["geocode", location],
        queryFn: () => getGeocode({ location, apiKey }),
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

    const handleApiKeySubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const key = formData.get("apiKey") as string
        if (key.trim()) {
            setApiKey(key.trim())
        }
    }

    return (
        <>
            <div className="flex flex-col gap-8">
                <div className="flex justify-between gap-8">
                    <div className="flex gap-8">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-center font-bold">Location</h1>
                            <LocationDropdown location={location} setLocation={setLocation} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-center font-bold">Map Type</h1>
                            <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
                        </div>
                    </div>

                    <button className="" onClick={() => setIsSidePanelOpen(true)}>
                        <HamburgerSVG className="size-8 invert" />
                    </button>
                </div>
                {!apiKey && (
                    <div className="p-4 rounded-xl bg-linear-to-br from-card to-card/60 shadow-md flex flex-col gap-4 max-w-2xl mb-8">
                        <h2 className="text-2xl font-semibold">OpenWeather API Key (Optional)</h2>
                        <p className="text-sm text-muted-foreground">
                            If you have an API key for OpenWeather, you can paste it here to utilize
                            over the 1,000 free requests per day. Your API key will not be saved and
                            will only be stored in your browser's memory for this session.
                        </p>
                        <form onSubmit={handleApiKeySubmit} className="flex gap-2">
                            <input
                                type="text"
                                name="apiKey"
                                placeholder="Enter your API key"
                                className="flex-1 px-3 py-2 rounded-md bg-sidebar border border-muted-foreground/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                )}
                <div className="relative">
                    <Map
                        coords={coords}
                        onMapClick={(lat, lon) => onMapClick(lat, lon)}
                        mapType={mapType}
                        apiKey={apiKey}
                    />
                    <MapLegend mapType={mapType} />
                </div>
                <Suspense fallback={<CurrentSkeleton />}>
                    <CurrentWeather coords={coords} apiKey={apiKey} />
                </Suspense>
                <Suspense fallback={<HourlySkeleton />}>
                    <HourlyForecast coords={coords} apiKey={apiKey} />
                </Suspense>
                <Suspense fallback={<DailySkeleton />}>
                    <DailyForecast coords={coords} apiKey={apiKey} />
                </Suspense>
                <Suspense fallback={<AddtitionalInfoSkeleton />}>
                    <AdditionalInfo coords={coords} apiKey={apiKey} />
                </Suspense>
            </div>
            <SidePanel
                coords={coords}
                isSidePanelOpen={isSidePanelOpen}
                setIsSidePanelOpen={setIsSidePanelOpen}
            />
        </>
    )
}

export default App
