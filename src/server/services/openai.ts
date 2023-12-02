/* eslint-disable @typescript-eslint/await-thenable */
import OpenAI from 'openai'

import { OPENAI_API_KEY } from '../util/config'

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

export const createCompletionStream = async () => {
  const stream = await openai.beta.chat.completions.stream({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'Say this is a test' }],
    stream: true,
  })

  return stream
}
