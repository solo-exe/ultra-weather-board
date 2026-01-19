import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import type { Coords } from "../types"

type Props = {
    coords: Coords
    onMapClick: (lat: number, lon: number) => void
}

const Map = ({ coords, onMapClick }: Props) => {
    const { lat, lon } = coords
    return (
        <MapContainer
            // key={`${lat},${lon}`} // added to force rerendeer when coordinates change
            center={[lat, lon]}
            zoom={5}
            style={{ width: "100vw", height: "500px" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> */}
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

export default Map
