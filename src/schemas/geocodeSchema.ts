import z from "zod"

export interface City {
    name: string
    local_names?: Record<string, string> | null
    lat: number
    lon: number
    country: string
    state?: string
}

export type CitiesResponse = City[]

export const geocodeSchema = z.array(
    z.object({
        name: z.string(),
        local_names: z.record(z.string(), z.string()).optional().nullable(),
        lat: z.number(),
        lon: z.number(),
        country: z.string(),
        state: z.string().optional().nullable(),
    })
)

export type GeoCodeData = z.infer<typeof geocodeSchema>
