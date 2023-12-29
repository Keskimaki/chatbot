import { MODEL_API_URL } from '../util/config'
import { ModelResponse, StreamData, Prompt } from '../types'

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

export const parseModelPrompt = (prompt: Prompt) => {
  const { system, messages } = prompt

  // Only Mixtral 8x7B for now
  const mixtralSystem = `<s>[INST] ${system} [/INST]`
  const mixtralMessages = messages.map(({ role, content }) => {
    if (role === 'assistant') return `${content}</s>`
    return `[INST] User: ${content} [/INST] Assistant: `
  })

  const mixtralPrompt = [mixtralSystem, ...mixtralMessages].join(' ')

  return mixtralPrompt
}

export const parseChunk = (chunk: string) => {
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
  if (!reader) throw new Error('Stream connection failed')

  return reader
}
