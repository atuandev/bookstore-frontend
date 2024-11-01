import { z } from 'zod'

export const TokenSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z.object({
    token: z.string(),
  }),
})

export type TokenSchemaType = z.infer<typeof TokenSchema>