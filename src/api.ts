import { createApiResponseSchema } from "./schemas/apiGatewayResSchema"
import { geocodeSchema } from "./schemas/geocodeSchema"
import { weatherSchema } from "./schemas/weatherSchema"

const baseUrl = "http://localhost:7002/api/v1/openweather"

export const getWeather = async (data: { lat: number; lon: number; appId?: string }) => {
    const { lat, lon, appId } = data

    const params = new URLSearchParams({
        lat: lat.toString(),
        lon: lon.toString(),
        ...(appId ? { appId: appId ?? "" } : {}),
    })
    const url = `${baseUrl}/weather?${params}`

    try {
        const res = await fetch(url)
        const weatherData = await res.json()

        const parsedResponse = createApiResponseSchema(weatherSchema).parse(weatherData)

        return parsedResponse.data
    } catch (error) {
        console.error("WEATHER FETCH ERROR:", error)
        throw error
    }
}

export const getGeocode = async (data: { placeName: string; appId?: string }) => {
    const { placeName, appId } = data

    const params = new URLSearchParams({
        q: placeName.toString(),
        limit: "1",
        ...(appId ? { appId: appId ?? "" } : {}),
    })
    const url = `${baseUrl}/geocode?${params}`

    try {
        const res = await fetch(url)
        const geocodeData = await res.json()

        const parsedResponse = createApiResponseSchema(geocodeSchema).parse(geocodeData)

        return parsedResponse.data
    } catch (error) {
        console.error("GEOCODE FETCH ERROR:", error)
        throw error
    }
}
