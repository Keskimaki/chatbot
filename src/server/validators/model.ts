import { z } from 'zod'

export const completionSchema = z.object({
  prompt: z.string().min(1),
})
