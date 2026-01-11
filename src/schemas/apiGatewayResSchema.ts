import z from "zod"

export interface ApiResponse<T> {
    status: string
    code: number
    data: T
}

export const createApiResponseSchema = <T>(dataSchema: z.ZodType<T>): z.ZodType<ApiResponse<T>> =>
    z.object({
        status: z.string(),
        code: z.number(),
        data: dataSchema,
    })
