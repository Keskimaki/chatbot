import { MODEL_API_URL } from '../util/config'
import { ModelResponse, StreamData } from '../types'

export const createCompletion = async (prompt: string) => {
  const response = await fetch(`${MODEL_API_URL}/v1/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
    }),
  })

  // TODO: Handle errors
  const completion = (await response.json()) as ModelResponse

  return completion
}

const parseChunk = (chunk: string) => {
  const [_, data] = chunk.split('data: ')

  if (!data) return { token: '' }

  return JSON.parse(data) as StreamData
}

export const createCompletionStream = async (prompt: string) => {
  const response = await fetch(`${MODEL_API_URL}/extra/generate/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
    }),
  })

  const reader = response.body?.getReader()
  const decoder = new TextDecoder('utf-8')

  if (!reader) throw new Error('Stream connection failed')

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { done, value } = await reader.read()

    if (done) break

    const chunk = decoder.decode(value)
    const event = parseChunk(chunk)

    console.log(event)
  }
}
