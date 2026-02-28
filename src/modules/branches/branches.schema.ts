import { z } from 'zod'

export const getBranchesSchema = z.object({
    page: z
        .string()
        .optional()
        .transform(val => val ? Number(val) : undefined)
        .refine(val => val === undefined || (Number.isInteger(val) && val > 0), {
            message: "'page' мора да биде позитивен цел број",
        }),
    limit: z
        .string()
        .optional()
        .transform(val => val ? Number(val) : undefined)
        .refine(val => val === undefined || (Number.isInteger(val) && val > 0), {
            message: "'limit' мора да биде позитивен цел број",
        }),
    city: z
        .string()
        .min(5, "'city' мора да има најмалку 5 карактери")
        .max(15, "'city' не смее да надмине 15 карактери")
        .optional(),
})

export const getBranchByIdSchema = z.object({
    id: z
        .string()
        .min(5, "'id' мора да има најмалку 5 карактери")
        .max(15, "'id' не смее да надмине 15 карактери"),
})


export type GetBranchesDTO = z.infer<typeof getBranchesSchema>
export type GetBranchByIdDTO = z.infer<typeof getBranchByIdSchema>