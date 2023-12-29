import { z } from 'zod'

const roles = ['user', 'assistant'] as const

const messageSchema = z.object({
  role: z.enum(roles),
  content: z.string(),
})

export const promptSchema = z.object({
  system: z.string(),
  messages: z.array(messageSchema),
})

export const completionSchema = z.object({
  chatId: z.string().uuid(),
  model: z.string().min(1).max(255),
  prompt: promptSchema,
})
