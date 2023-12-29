import { z } from 'zod'

import { chatOptionsSchema } from './validators/openai'

export type ChatOptions = z.infer<typeof chatOptionsSchema>

type ModelResult = {
  text: string
}

export type ModelResponse = {
  results: ModelResult[]
}

export type StreamData = {
  token: string
}
