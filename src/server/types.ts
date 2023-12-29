import { z } from 'zod'

import { chatOptionsSchema } from './validators/openai'
import { promptSchema } from './validators/model'

export type ChatOptions = z.infer<typeof chatOptionsSchema>

export type Prompt = z.infer<typeof promptSchema>

type ModelResult = {
  text: string
}

export type ModelResponse = {
  results: ModelResult[]
}

export type StreamData = {
  token: string
}
