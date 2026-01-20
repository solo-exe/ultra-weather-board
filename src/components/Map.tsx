import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import type { Coords } from "../types"
import { useEffect } from "react"
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk"

type Props = {
    coords: Coords
    onMapClick: (lat: number, lon: number) => void
    mapType: string
}

const APIKey = "a7befb129c4a71e1ed7001c9de409e25"

const Map = ({ coords, onMapClick, mapType }: Props) => {
    const { lat, lon } = coords
    return (
        <MapContainer
            // key={`${lat},${lon}`} // added to force rerendeer when coordinates change
            center={[lat, lon]}
            zoom={5}
            style={{ width: "100vw", height: "800px" }}
        >
            <MapTileLayer />
            {/* <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> */}
            <TileLayer
                opacity={0.7}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${APIKey}`}
            />
            <MapClick onMapClick={onMapClick} coords={coords} />
            <Marker position={[lat, lon]} />
        </MapContainer>
    )
}

const MapClick = ({
    onMapClick,
    coords,
}: {
    onMapClick: (lat: number, lon: number) => void
    coords: Coords
}): null => {
    const map = useMap()
    map.panTo([coords.lat, coords.lon])

    map.on("click", (e) => {
        const { lat, lng } = e.latlng
        onMapClick(lat, lng)
    })

    return null
}

const MapTileLayer = () => {
    const map = useMap()

    useEffect(() => {
        const tileLayer = new MaptilerLayer({ style: "basic-dark", apiKey: "EOAlp4WrLriUoAY1wYV8" })
        tileLayer.addTo(map)

        return () => {
            map.removeLayer(tileLayer)
        }
    }, [map])

    return null
}

export default Map
