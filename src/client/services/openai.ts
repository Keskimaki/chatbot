import { Message } from '../../types'

import queryClient from '../util/queryClient'
import { queryKey } from '../hooks/useChats'

export const getCompletionStream = async (
  chatId: string,
  model: string,
  system: string,
  messages: Message[]
) => {
  const response = await fetch('/api/models/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chatId,
      model,
      prompt: {
        system,
        messages,
      },
    }),
  })

  const stream = response.body as ReadableStream<Uint8Array>

  return stream
}

export const generateChatTitle = async (chatId: string) => {
  const response = await fetch(`/api/openai/title/${chatId}`, {
    method: 'POST',
  })

  const { title } = (await response.json()) as { title: string }

  queryClient.invalidateQueries({ queryKey })

  return title
}
