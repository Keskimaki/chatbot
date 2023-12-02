import { z } from 'zod'

import { roles } from '../../config'

export const messageSchema = z.object({
  role: z.enum(roles),
  content: z.string(),
})

export const chatOptionsSchema = z.object({
  model: z.string().min(1).max(255),
  messages: z
    .array(
      z.object({
        role: z.enum(roles),
        content: z.string(),
      })
    )
    .min(1),
})

export const openaiStreamSchema = chatOptionsSchema.extend({
  chatId: z.string().uuid(),
})

export const chatTitleSchema = z.object({
  title: z.string().min(1),
})
