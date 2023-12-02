import OpenAI from 'openai'

import { ChatOptions } from '../types'
import { OPENAI_API_KEY } from '../util/config'

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

export const createCompletionStream = (options: ChatOptions) => {
  const stream = openai.beta.chat.completions.stream({
    ...options,
    stream: true,
  })

  return stream
}
