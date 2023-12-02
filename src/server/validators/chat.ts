import { z } from 'zod'

export const newChatSchema = z.object({
  name: z.string().min(1).max(255),
})
