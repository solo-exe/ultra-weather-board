import { Suspense, useState, useEffect } from "react"
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
import MobileHeader from "./components/MobileHeader"
import LightDarkToggle from "./components/LightDarkToggle"
import ApiKeyForm from "./components/ApiKeyForm"
import { saveApiKey, getApiKey, clearApiKey, getTimeUntilExpiration } from "./utils/apiKeyStorage"

function App() {
    const [coordinates, setCoords] = useState<Coords>({ lat: 10, lon: 25 })
    const [location, setLocation] = useState("")
    const [mapType, setMapType] = useState<MapType>("clouds_new")
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)

    const [minutesRemaining, setMinutesRemaining] = useState<number>(0)
    const [apiKey, setApiKey] = useState<string | undefined>(() => {
        // Initialize from localStorage on mount
        const storedKey = getApiKey()
        return storedKey || undefined
    })

    // Check for API key expiration and update remaining time
    useEffect(() => {
        if (!apiKey) {
            return
        }

        // Update immediately on mount/apiKey change
        const updateRemainingTime = () => {
            const timeRemaining = getTimeUntilExpiration()
            if (timeRemaining === 0) {
                // Key has expired
                setApiKey(undefined)
                setMinutesRemaining(0)
            } else {
                // Convert milliseconds to minutes and round up
                const minutes = Math.ceil(timeRemaining / 60000)
                setMinutesRemaining(minutes)
            }
        }

        updateRemainingTime()

        // Check every second for smoother countdown
        const interval = setInterval(updateRemainingTime, 1000)

        return () => clearInterval(interval)
    }, [apiKey])

    const { data: geocodeData } = useQuery({
        queryKey: ["geocode", location],
        queryFn: () => getGeocode({ location, apiKey: apiKey ?? undefined }),
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
            const trimmedKey = key.trim()
            saveApiKey(trimmedKey)
            setApiKey(trimmedKey)
        }
    }

    const handleClearApiKey = () => {
        clearApiKey()
        setApiKey(undefined)
    }

    return (
        <>
            <MobileHeader setIsSidePanelOpen={setIsSidePanelOpen} />
            <div className="flex flex-col gap-8 p-8 w-full lg:w-[calc(100dvw-var(--sidebar-width))] h-full min-w-[273px]">
                <div className="flex flex-col sm:flex-row justify-between gap-8">
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-center font-bold">Location</h1>
                            <LocationDropdown location={location} setLocation={setLocation} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-center font-bold whitespace-nowrap">Map Type</h1>
                            <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
                        </div>
                    </div>
                    <div className="flex gap-8">
                        <div className="hidden md:block">
                            <LightDarkToggle />
                        </div>
                        <button
                            className="hidden md:block self-start"
                            onClick={() => setIsSidePanelOpen(true)}
                        >
                            <HamburgerSVG className="size-6 lg:hidden" />
                        </button>
                    </div>
                </div>

                {!apiKey && <ApiKeyForm handleApiKeySubmit={handleApiKeySubmit} />}
                {apiKey && (
                    <div className="p-4 rounded-xl bg-linear-to-br from-card to-card/60 shadow-md flex gap-2 items-center justify-between max-w-2xl mb-8">
                        <p className="text-sm text-muted-foreground">
                            API key is active and will expire in{" "}
                            <span className="font-semibold text-foreground">
                                {minutesRemaining}
                            </span>{" "}
                            {minutesRemaining === 1 ? "minute" : "minutes"}.
                        </p>
                        <button
                            onClick={handleClearApiKey}
                            className="px-4 py-2 rounded-md bg-destructive text-destructive-foreground font-medium hover:bg-destructive/90 transition-colors"
                        >
                            Clear API Key
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-4">
                    <div className="relative md:col-span-2 xl:col-span-4 xl:row-span-2 order-1 h-120 xl:h-auto ">
                        <Map
                            coords={coords}
                            onMapClick={(lat, lon) => onMapClick(lat, lon)}
                            mapType={mapType}
                            apiKey={apiKey ?? undefined}
                        />
                        <MapLegend mapType={mapType} />
                    </div>
                    <div className="col-span-1 xl:row-span-2 order-2">
                        <Suspense fallback={<CurrentSkeleton />}>
                            <CurrentWeather coords={coords} apiKey={apiKey ?? undefined} />
                        </Suspense>
                    </div>
                    <div className="col-span-1 xl:row-span-2 order-3 xl:order-4">
                        <Suspense fallback={<DailySkeleton />}>
                            <DailyForecast coords={coords} apiKey={apiKey ?? undefined} />
                        </Suspense>
                    </div>
                    <div className="col-span-1 md:col-span-2 xl:row-span-1 order-4 xl:order-3">
                        <Suspense fallback={<HourlySkeleton />}>
                            <HourlyForecast coords={coords} apiKey={apiKey ?? undefined} />
                        </Suspense>
                    </div>
                    <div className="col-span-1 md:col-span-2 xl:row-span-1 order-5">
                        <Suspense fallback={<AddtitionalInfoSkeleton />}>
                            <AdditionalInfo coords={coords} apiKey={apiKey ?? undefined} />
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
