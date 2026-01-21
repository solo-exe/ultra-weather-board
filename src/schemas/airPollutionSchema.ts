import { z } from "zod"

const componentsSchema = z.object({
    co: z.number(),
    no: z.number(),
    no2: z.number(),
    o3: z.number(),
    so2: z.number(),
    pm2_5: z.number(),
    pm10: z.number(),
    nh3: z.number(),
})

const airQualitySchema = z.object({
    dt: z.number(),
    main: z.object({
        aqi: z.number(),
    }),
    components: componentsSchema,
})

export const airPollutionSchema = z.object({
    coord: z.object({
        lat: z.number(),
        lon: z.number(),
    }),
    list: z.array(airQualitySchema),
})

export type AirQuality = z.infer<typeof airQualitySchema>
export type Components = z.infer<typeof componentsSchema>
export type AirPollution = z.infer<typeof airPollutionSchema>
