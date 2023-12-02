import { OpenaiMessage } from '../../types'

export const getCompletionStream = async (
  model: string,
  system: string,
  messages: OpenaiMessage[]
) => {
  const response = await fetch('/api/openai/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'system',
          content: system,
        },
        ...messages,
      ],
    }),
  })

  const stream = response.body as ReadableStream<Uint8Array>

  return stream
}
