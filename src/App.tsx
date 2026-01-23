import { Suspense, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import DailyForecast from "./components/cards/DailyForecast"
import HourlyForecast from "./components/cards/HourlyForecast"
import CurrentWeather from "./components/cards/CurrentWeather"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import LocationDropdown from "./components/dropdowns/LocationDropdown"
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown"
import MapLegend from "./components/MapLegend"
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton"
import DailySkeleton from "./components/skeletons/DailySkeleton"
import HourlySkeleton from "./components/skeletons/HourlySkeleton"
import AddtitionalInfoSkeleton from "./components/skeletons/AddtitionalInfoSkeleton"
import SidePanel from "./components/SidePanel"
import HamburgerSVG from "./assets/hamburger.svg?react"
import Map from "./components/Map"
import type { Coords, MapType } from "./types"
import { getGeocode } from "./api"

function App() {
    const [coordinates, setCoords] = useState<Coords>({ lat: 10, lon: 25 })
    const [location, setLocation] = useState("")
    const [mapType, setMapType] = useState<MapType>("clouds_new")
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
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
            <div className="flex flex-col gap-8 p-8 w-full lg:w-[calc(100dvw-var(--sidebar-width))] h-full">
                <div className="flex justify-between gap-8">
                    <div className="flex gap-8">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-center font-bold">Location</h1>
                            <LocationDropdown location={location} setLocation={setLocation} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-center font-bold whitespace-nowrap">Map Type</h1>
                            <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
                        </div>
                    </div>
                    <button className="" onClick={() => setIsSidePanelOpen(true)}>
                        <HamburgerSVG className="size-6 invert lg:hidden" />
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
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-4">
                    <div className="relative md:col-span-2 xl:col-span-4 xl:row-span-2 order-1 h-120 xl:h-auto ">
                        <Map
                            coords={coords}
                            onMapClick={(lat, lon) => onMapClick(lat, lon)}
                            mapType={mapType}
                            apiKey={apiKey}
                        />
                        <MapLegend mapType={mapType} />
                    </div>
                    <div className="col-span-1 xl:row-span-2 order-2">
                        <Suspense fallback={<CurrentSkeleton />}>
                            <CurrentWeather coords={coords} apiKey={apiKey} />
                        </Suspense>
                    </div>
                    <div className="col-span-1 xl:row-span-2 order-3 xl:order-4">
                        <Suspense fallback={<DailySkeleton />}>
                            <DailyForecast coords={coords} apiKey={apiKey} />
                        </Suspense>
                    </div>
                    <div className="col-span-1 md:col-span-2 xl:row-span-1 order-4 xl:order-3">
                        <Suspense fallback={<HourlySkeleton />}>
                            <HourlyForecast coords={coords} apiKey={apiKey} />
                        </Suspense>
                    </div>
                    <div className="col-span-1 md:col-span-2 xl:row-span-1 order-5">
                        <Suspense fallback={<AddtitionalInfoSkeleton />}>
                            <AdditionalInfo coords={coords} apiKey={apiKey} />
                        </Suspense>
                    </div>
                </div>
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
