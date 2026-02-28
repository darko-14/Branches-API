import { z } from 'zod'

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(5, "'username' мора да има најмалку 5 карактери")
    .max(15, "'username' не смее да надмине 15 карактери"),
  password: z
    .string()
    .trim()
    .min(5, "'password' мора да има најмалку 5 карактери")
    .max(15, "'password' не смее да надмине 15 карактери"),
})

export type LoginDTO = z.infer<typeof loginSchema>