import { createApiResponseSchema } from "./schemas/apiGatewayResSchema"
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
        console.error("DATA FETCH ERROR:", error)
        throw error
    }
}
